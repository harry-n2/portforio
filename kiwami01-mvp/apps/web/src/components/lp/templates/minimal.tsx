import { LPContent } from "./index"

export function MinimalTemplate({ content }: { content: LPContent }) {
    return (
        <div className="min-h-screen bg-white text-black p-20">
            <h1 className="text-6xl font-bold mb-10 tracking-tighter">{content.catchCopy}</h1>
            <p className="text-2xl mb-10 max-w-2xl">{content.bodyCopy.intro}</p>
            {/* Simplistic implementation for MVP placeholder */}
            <div className="grid gap-10">
                <p>{content.bodyCopy.problemStatement}</p>
                <p>{content.bodyCopy.solution}</p>
            </div>
        </div>
    )
}
