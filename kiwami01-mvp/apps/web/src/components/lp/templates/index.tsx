import { GorgeousTemplate } from "./gorgeous"
import { MinimalTemplate } from "./minimal"
import { CorporateTemplate } from "./corporate"

export type LPContent = {
    catchCopy: string;
    bodyCopy: {
        intro: string;
        problemStatement: string;
        solution: string;
        benefits: string[];
        socialProof: string;
        cta: string;
    };
    ctaText: string;
}

interface LPTemplateProps {
    theme: string;
    content: LPContent;
}

export function LPTemplateRouter({ theme, content }: LPTemplateProps) {
    switch (theme) {
        case "gorgeous":
            return <GorgeousTemplate content={content} />
        case "minimal":
            return <MinimalTemplate content={content} />
        case "corporate":
            return <CorporateTemplate content={content} />
        default:
            return <GorgeousTemplate content={content} />
    }
}
