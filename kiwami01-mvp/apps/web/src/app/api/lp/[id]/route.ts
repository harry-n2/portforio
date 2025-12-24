import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@kiwami/database';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Auth Check (Mock for MVP phase 1)
        // const session = await getServerSession(authOptions);
        // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = params.id;
        const body = await req.json();

        // Partial Update
        const updated = await prisma.landingPage.update({
            where: { id },
            data: {
                ...body,
                updatedAt: new Date(),
            },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('LP Update Error:', error);
        return NextResponse.json(
            { error: 'Failed to update LP' },
            { status: 500 }
        );
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        const lp = await prisma.landingPage.findUnique({
            where: { id },
        });

        if (!lp) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: lp });
    } catch (error) {
        console.error('LP Get Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch LP' },
            { status: 500 }
        );
    }
}
