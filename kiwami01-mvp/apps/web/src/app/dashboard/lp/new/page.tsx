import { LPCreationForm } from "@/components/lp/lp-creation-form"

export default function NewLPPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto py-10">
                <LPCreationForm />
            </div>
        </div>
    )
}
