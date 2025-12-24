import { LPContent } from "./index"

export function CorporateTemplate({ content }: { content: LPContent }) {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <div className="bg-slate-900 text-white p-20 text-center">
                <h1 className="text-4xl font-bold mb-4">{content.catchCopy}</h1>
                <p className="text-lg opacity-80">{content.bodyCopy.intro}</p>
            </div>
            {/* Corporate implementation placeholder */}
            <div className="container mx-auto p-12">
                <div className="bg-white p-8 shadow-sm border">
                    <h2 className="text-xl font-bold mb-4 text-blue-900">Overview</h2>
                    <p>{content.bodyCopy.solution}</p>
                </div>
            </div>
        </div>
    )
}
