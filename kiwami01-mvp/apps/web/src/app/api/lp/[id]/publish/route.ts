import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@kiwami/database';

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const published = await prisma.landingPage.update({
            where: { id },
            data: {
                status: 'PUBLISHED',
                publishedAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, data: published });
    } catch (error) {
        console.error('LP Publish Error:', error);
        return NextResponse.json(
            { error: 'Failed to publish LP' },
            { status: 500 }
        );
    }
}
