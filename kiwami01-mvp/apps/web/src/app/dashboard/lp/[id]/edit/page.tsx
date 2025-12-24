import { LPPreview } from "@/components/lp/lp-preview"
import { prisma } from "@kiwami/database"
import { notFound } from "next/navigation"

export default async function EditLPPage({ params }: { params: { id: string } }) {
    const lp = await prisma.landingPage.findUnique({
        where: { id: params.id },
    })

    if (!lp) return notFound()

    // Adapt DB data to FE format
    // Note: Actual implementation needs proper type casting/schema validation
    const initialContent = {
        catchCopies: [lp.catchCopy || ""],
        bodyCopy: (lp.bodyCopy as any) || {
            intro: "", problemStatement: "", solution: "", benefits: [], socialProof: "", cta: ""
        },
        ctaTexts: [lp.ctaText || "Sign Up"],
    }

    return (
        <LPPreview
            initialContent={initialContent}
            lpId={lp.id}
            isPublished={lp.status === 'PUBLISHED'}
        />
    )
}
