from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Any
import os
from dotenv import load_dotenv
from prisma import Prisma
import stripe
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage, FollowEvent
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request as GoogleRequest
from googleapiclient.discovery import build
import datetime

load_dotenv()

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database
db = Prisma()

# External Services
line_bot_api = LineBotApi(os.getenv('LINE_CHANNEL_ACCESS_TOKEN'))
handler = WebhookHandler(os.getenv('LINE_CHANNEL_SECRET'))
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

# Google Calendar Scopes
SCOPES = ['https://www.googleapis.com/auth/calendar']

@app.on_event("startup")
async def startup():
    await db.connect()
    print("Prisma connected.")
    
    # Google Calendar Auth
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(GoogleRequest())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES) # User must provide credentials.json from Google Cloud Console
            # Note: In a real server, we can't pop up a browser. 
            # For local dev this works. For prod, use Service Account or store tokens securely.
            # creds = flow.run_local_server(port=0) 
            pass # Skip auto-run for now to avoid blocking startup if no interaction
        # with open('token.json', 'w') as token:
        #     token.write(creds.to_json())
    
    # Attach service to app state (simplified)
    if creds:
        app.state.calendar_service = build('calendar', 'v3', credentials=creds)
    else:
        app.state.calendar_service = None
        print("Warning: Google Calendar service not initialized. token.json missing.")


@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/")
def read_root():
    return {"message": "Welcome to Kyoku Zero Ichi Shukyaku API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# --- Models ---
class LPRequest(BaseModel):
    purpose: str
    target_audience: str

class LeadIn(BaseModel):
    email: str
    name: str
    source: str = "lp"

class CalendarRequest(BaseModel):
    date: str # YYYY-MM-DD

class BookingRequest(BaseModel):
    slot_start: str # ISO format
    slot_end: str   # ISO format
    name: str
    email: str

class CheckoutRequest(BaseModel):
    amount: int
    currency: str = "jpy"
    lead_id: int # optional

# --- LP Generation (2.1) ---
@app.post("/api/generate_lp")
async def generate_lp(request: LPRequest):
    # Mock AI generation
    generated_content = f"""
    # {request.purpose}
    
    Targeting: {request.target_audience}
    
    ## Why Choose Us?
    We offer the best solution for {request.target_audience} looking to achieve {request.purpose}.
    
    ## Features
    - Fast Setup
    - High Conversion
    - Automations
    
    [Join Now]
    """
    return {"content": generated_content}

@app.post("/api/leads")
async def create_lead(lead: LeadIn):
    try:
        new_lead = await db.lead.create(
            data={
                'email': lead.email,
                'name': lead.name,
                'source': lead.source,
            }
        )
        return new_lead
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Lead registration failed")

# --- LINE Integration (2.2, 2.3) ---
@app.post("/webhook/line")
async def line_webhook(request: Request):
    signature = request.headers['X-Line-Signature']
    body = await request.body()
    
    try:
        handler.handle(body.decode('utf-8'), signature)
    except InvalidSignatureError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    return "OK"

@handler.add(FollowEvent)
def handle_follow(event):
    line_user_id = event.source.user_id
    # Ask for email to link account
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text="友だち追加ありがとうございます！連携のため、メールアドレスを入力してください。")
    )

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    text = event.message.text
    # Simple logic: if text looks like email, try to link
    if "@" in text:
        # Verify lead exists (sync wrapper for async db call is tricky in handlers, usually use tasks)
        # For prototype, we assume we can link later. 
        # Here we just reply.
        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(text=f"メールアドレス {text} を確認しました。（デモ: 連携完了）")
        )
    else:
        line_bot_api.reply_message(
            event.reply_token,
            TextSendMessage(text="ご用件は何でしょうか？")
        )

# --- Reservation System (2.4) ---
@app.post("/api/calendar/slots")
async def get_available_slots(req: CalendarRequest):
    # Real Google Calendar Logic would go here
    # Mock Response
    return {
        "date": req.date,
        "slots": [
            {"start": f"{req.date}T10:00:00", "end": f"{req.date}T11:00:00", "available": True},
            {"start": f"{req.date}T13:00:00", "end": f"{req.date}T14:00:00", "available": True},
            {"start": f"{req.date}T15:00:00", "end": f"{req.date}T16:00:00", "available": False},
        ]
    }

@app.post("/api/calendar/book")
async def create_booking(req: BookingRequest):
    try:
        # 1. Create Google Calendar Event
        # if app.state.calendar_service: ...
        
        # 2. Return success
        return {"status": "booked", "details": req}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- Payment System (2.5) ---
@app.post("/api/payment/create-checkout-session")
async def create_checkout_session(req: CheckoutRequest):
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': req.currency,
                    'product_data': {
                        'name': 'Reservation Fee',
                    },
                    'unit_amount': req.amount,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/success', # Demo URL
            cancel_url='http://localhost:5173/cancel',
        )
        
        # Store pending payment in DB
        await db.payment.create(
            data={
                'leadId': req.lead_id if req.lead_id else 1, # Default to demo lead
                'amount': req.amount,
                'currency': req.currency,
                'stripeChargeId': session.id, # storing session id temporarily
                'status': 'pending'
            }
        )
        
        return {"checkout_url": session.url}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv('STRIPE_WEBHOOK_SECRET')
        )
    except Exception as e:
         raise HTTPException(status_code=400, detail="Invalid Stripe signature")

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Update DB
        # payment = await db.payment.find_first(where={'stripeChargeId': session.id})
        # Mock update
        print(f"Payment successful for session: {session.id}")
        
    return {"status": "success"}

# --- Forms & Rewards (2.6, 2.7, 2.10) ---
class FeedbackIn(BaseModel):
    lead_id: int
    rating: int # 1 to 5
    comment: Optional[str] = None

@app.post("/api/feedback")
async def submit_feedback(feedback_in: FeedbackIn):
    try:
        # 1. Feedbackの保存
        feedback = await db.feedback.create(
            data={
                'leadId': feedback_in.lead_id,
                'rating': feedback_in.rating,
                'comment': feedback_in.comment,
            }
        )

        # 2. Reward (ポイント) の自動付与ロジック
        points_awarded = 100 # 例: フィードバック完了で100ポイント
        
        reward = await db.reward.create(
            data={
                'leadId': feedback_in.lead_id,
                'points': points_awarded,
                'reason': 'フィードバック提出完了',
            }
        )
        
        return {
            "message": "Feedback submitted and reward granted.",
            "feedback_id": feedback.id,
            "reward_points": points_awarded
        }
    except Exception as e:
        print(f"Feedback/Reward Error: {e}")
        # For dev/demo, we allow it to pass even if DB fails or if models not migrated yet
        # raise HTTPException(status_code=500, detail="Database error during feedback/reward processing.")
        return {"mock_response": "Feedback received (DB might be missing)"}

# --- SNS & SEO Content Generation (2.8, 2.9) ---
class ContentRequest(BaseModel):
    topic: str
    target_platform: str # 'sns' or 'seo_blog'

@app.post("/api/generate_content")
async def generate_content(request: ContentRequest):
    # TODO: 実際にはOpenAI APIを呼び出すロジック
    
    # 簡易モックロジック:
    if request.target_platform == 'sns':
        generated_text = f"【SNS投稿案】{request.topic}についての3つのヒント！ #SaaS #ビジネス #中小企業"
    elif request.target_platform == 'seo_blog':
        generated_text = f"【SEOブログ記事案】タイトル: {request.topic}で失敗しないための完全ガイド。\nキーワード: {request.topic}, ガイド, 成功"
    else:
        raise HTTPException(status_code=400, detail="Invalid target platform.")
        
    return {"content": generated_text, "platform": request.target_platform}
