import { NextRequest, NextResponse } from 'next/server';
import { generateLPContent } from '@/lib/ai/lp-generator';
import { z } from 'zod';

// Schema Validation
const GenerateRequestSchema = z.object({
    industry: z.string().min(1),
    productName: z.string().min(1).max(100),
    mainBenefit: z.string().min(1).max(500),
    targetAudience: z.object({
        age: z.string().optional(),
        gender: z.string().optional(),
        occupation: z.string().optional(),
        painPoints: z.array(z.string()).optional(),
    }),
    designTheme: z.enum(['gorgeous', 'minimal', 'corporate', 'casual', 'tech']),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = GenerateRequestSchema.parse(body);

        const generatedContent = await generateLPContent(validatedData);

        return NextResponse.json({
            success: true,
            generatedContent,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid request data', details: error.errors },
                { status: 400 }
            );
        }
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate LP' },
            { status: 500 }
        );
    }
}
