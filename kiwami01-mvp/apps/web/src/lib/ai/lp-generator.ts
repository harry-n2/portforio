import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || 'mock-key',
});

export interface LPGenerationInput {
    industry: string;
    productName: string;
    mainBenefit: string;
    targetAudience: {
        age?: string;
        gender?: string;
        occupation?: string;
        painPoints?: string[];
    };
    designTheme: 'gorgeous' | 'minimal' | 'corporate' | 'casual' | 'tech';
}

export interface LPGenerationOutput {
    catchCopies: string[];
    bodyCopy: {
        intro: string;
        problemStatement: string;
        solution: string;
        benefits: string[];
        socialProof?: string;
        cta: string;
    };
    ctaTexts: string[];
    metaTitle: string;
    metaDescription: string;
}

export async function generateLPContent(
    input: LPGenerationInput
): Promise<LPGenerationOutput> {
    // Mock response if no API key
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'mock-key') {
        return getMockResponse(input);
    }

    const prompt = buildPrompt(input);

    try {
        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20240620',
            max_tokens: 4000,
            temperature: 0.7,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        const content = message.content[0];
        if (content.type !== 'text') {
            throw new Error('Unexpected response type from Claude');
        }

        return parseAIResponse(content.text);
    } catch (error) {
        console.error('LP generation error:', error);
        throw new Error('Failed to generate LP content');
    }
}

function buildPrompt(input: LPGenerationInput): string {
    const audienceDescription = [
        input.targetAudience.age && `Age: ${input.targetAudience.age}`,
        input.targetAudience.gender && `Gender: ${input.targetAudience.gender}`,
        input.targetAudience.occupation && `Occupation: ${input.targetAudience.occupation}`,
        input.targetAudience.painPoints?.length &&
        `Pain Points: ${input.targetAudience.painPoints.join(', ')}`,
    ]
        .filter(Boolean)
        .join('\n');

    return `
You are a world-class copywriter specializing in high-end, elegant business writing.
Generate landing page content for the following product:

【Product Info】
Industry: ${input.industry}
Product Name: ${input.productName}
Main Benefit: ${input.mainBenefit}

【Target Audience】
${audienceDescription}

【Design Theme】
${input.designTheme} (Note: Even if the theme varies, maintain a tone of sophistication, trust, and elegance suitable for a "World Trade Next" class brand.)

【Requirements】
Output purely valid JSON with the following structure:
{
  "catchCopies": [
    "Emotional, high-impact headline 1",
    "Logical, benefit-driven headline 2",
    "Urgency-focused headline 3"
  ],
  "bodyCopy": {
    "intro": "Empathetic introduction (approx. 100 chars)",
    "problemStatement": "Vivid description of the target's problem (approx. 200 chars)",
    "solution": "How the product solves it (approx. 300 chars)",
    "benefits": [
      "Concrete benefit 1",
      "Concrete benefit 2",
      "Concrete benefit 3"
    ],
    "socialProof": "Trust-building element (e.g., testimonial or stat)",
    "cta": "Action-oriented closing statement (approx. 150 chars)"
  },
  "ctaTexts": [
    "Button text 1",
    "Button text 2",
    "Button text 3"
  ],
  "metaTitle": "SEO optimized title",
  "metaDescription": "SEO optimized description"
}

Language: Japanese
Tone: Professional, Elegant, Persuasive.
`.trim();
}

function parseAIResponse(responseText: string): LPGenerationOutput {
    try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found');
        }
        return JSON.parse(jsonMatch[0]) as LPGenerationOutput;
    } catch (error) {
        console.error('Parse error:', error);
        throw new Error('Failed to parse AI response');
    }
}

function getMockResponse(input: LPGenerationInput): LPGenerationOutput {
    return {
        catchCopies: [
            `【Mock】${input.productName}で、かつてない成果を。`,
            `【Mock】${input.industry}の常識を覆す、新しい解決策。`,
            `【Mock】今すぐ始める、${input.mainBenefit}への第一歩。`
        ],
        bodyCopy: {
            intro: "多くのプロフェッショナルが抱える課題に、私たちは真摯に向き合いました。",
            problemStatement: "日々の業務に追われ、本来の価値を発揮できていないと感じていませんか？既存の手法では限界があることは明白です。",
            solution: `${input.productName}は、独自のメソドロジーと先端技術を融合させ、あなたのビジネスを次のステージへと導きます。`,
            benefits: [
                "圧倒的な効率化を実現",
                "確実な成果へのロードマップ",
                "専任サポートによる安心感"
            ],
            socialProof: "導入企業満足度 98% (自社調べ)",
            cta: "今こそ、変化の時です。私たちと共に、新しい可能性の扉を開きましょう。"
        },
        ctaTexts: [
            "無料で試してみる",
            "資料をダウンロード",
            "お問い合わせ"
        ],
        metaTitle: `${input.productName} | ${input.mainBenefit}`,
        metaDescription: `${input.productName}は${input.industry}向けの革新的なソリューションです。`
    };
}
