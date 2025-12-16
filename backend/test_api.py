# backend/test_api.py
import pytest
from httpx import AsyncClient
from backend.main import app

# FastAPIのテストクライアントを使用
@pytest.mark.asyncio
async def test_health_check():
    """ヘルスチェックエンドポイントのテスト"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_read_root():
    """ルートエンドポイントのテスト"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")

    assert response.status_code == 200
    assert "message" in response.json()
