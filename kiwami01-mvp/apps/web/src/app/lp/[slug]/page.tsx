import { prisma } from "@kiwami/database"
import { notFound } from "next/navigation"
import { LPTemplateRouter, LPContent } from "@/components/lp/templates"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const lp = await prisma.landingPage.findUnique({
        where: { slug: params.slug },
    })

    if (!lp) return { title: "Not Found" }

    return {
        title: lp.metaTitle || lp.title,
        description: lp.metaDescription,
    }
}

export default async function PublicLPPage({ params }: { params: { slug: string } }) {
    const lp = await prisma.landingPage.findUnique({
        where: { slug: params.slug },
    })

    if (!lp || lp.status !== 'PUBLISHED') {
        return notFound()
    }

    // Type casting for MVP
    const content = {
        catchCopy: lp.catchCopy || "",
        bodyCopy: (lp.bodyCopy as any) || {},
        ctaText: lp.ctaText || "Learn More",
    } as LPContent

    return <LPTemplateRouter theme={lp.designTheme} content={content} />
}
