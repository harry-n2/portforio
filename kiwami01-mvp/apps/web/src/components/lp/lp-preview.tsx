"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Eye, Edit2, Loader2, Globe } from "lucide-react"
import { toast } from "sonner"

interface LPContent {
    catchCopies: string[];
    bodyCopy: {
        intro: string;
        problemStatement: string;
        solution: string;
        benefits: string[];
        socialProof: string;
        cta: string;
    };
    ctaTexts: string[];
}

interface LPPreviewProps {
    initialContent: LPContent;
    lpId: string;
    isPublished?: boolean;
}

export function LPPreview({ initialContent, lpId, isPublished = false }: LPPreviewProps) {
    const [content, setContent] = useState<LPContent>(initialContent)
    const [isSaving, setIsSaving] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)

    // Edit Handlers
    const handleUpdate = (section: string, value: string) => {
        // Basic deep path update logic or simple state update
        // For MVP, we might simplify or use robust state management
        // simplified for specific fields
        console.log("Update", section, value)
    }

    const saveContent = async () => {
        setIsSaving(true)
        try {
            const res = await fetch(`/api/lp/${lpId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bodyCopy: content.bodyCopy, catchCopy: content.catchCopies[0] }), // Example mapping
            })
            if (!res.ok) throw new Error("Failed to save")
            toast.success("Saved successfully")
        } catch (e) {
            toast.error("Failed to save")
        } finally {
            setIsSaving(false)
        }
    }

    const publishLP = async () => {
        setIsPublishing(true)
        try {
            const res = await fetch(`/api/lp/${lpId}/publish`, { method: "POST" })
            if (!res.ok) throw new Error("Failed to publish")
            toast.success("Published Successfully!")
            window.open(`/lp/${lpId}`, '_blank')
        } catch (e) {
            toast.error("Failed to publish")
        } finally {
            setIsPublishing(false)
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex items-center justify-between p-4 border-b bg-background z-10">
                <h2 className="font-bold text-lg">LP Editor</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={saveContent} disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save
                    </Button>
                    <Button onClick={publishLP} disabled={isPublishing} className="bg-primary text-primary-foreground">
                        {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
                        {isPublished ? "Update" : "Publish"}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
                <div className="border-b px-4">
                    <TabsList>
                        <TabsTrigger value="preview"><Eye className="w-4 h-4 mr-2" /> Preview</TabsTrigger>
                        <TabsTrigger value="edit"><Edit2 className="w-4 h-4 mr-2" /> Edit Content</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="preview" className="flex-1 overflow-auto bg-slate-50 p-8 dark:bg-slate-950">
                    {/* Mock Preview - Replace with actual Template Rendering */}
                    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow-xl min-h-[800px] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                        {/* Hero */}
                        <div className="bg-slate-900 text-white p-20 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/10" />
                            <h1 className="text-5xl font-serif font-bold mb-6 relative z-10">{content.catchCopies[0]}</h1>
                            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">{content.bodyCopy.intro}</p>
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-lg font-bold shadow-lg shadow-primary/20">
                                {content.ctaTexts[0]}
                            </Button>
                        </div>

                        {/* Problem/Solution */}
                        <div className="p-16 grid md:grid-cols-2 gap-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-primary">The Challenge</h3>
                                <p className="leading-relaxed text-lg">{content.bodyCopy.problemStatement}</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-primary">Our Solution</h3>
                                <p className="leading-relaxed text-lg">{content.bodyCopy.solution}</p>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-16 text-center">
                            <h3 className="text-3xl font-serif font-bold mb-12">Why Choose Us</h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {content.bodyCopy.benefits.map((b, i) => (
                                    <Card key={i} className="bg-background border-primary/10">
                                        <CardContent className="pt-6">
                                            <div className="text-4xl text-primary mb-4">0{i + 1}</div>
                                            <p className="font-medium text-lg">{b}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="edit" className="flex-1 overflow-auto p-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Label>Catch Copy</Label>
                                <Input
                                    value={content.catchCopies[0]}
                                    onChange={(e) => {
                                        const newCopies = [...content.catchCopies];
                                        newCopies[0] = e.target.value;
                                        setContent({ ...content, catchCopies: newCopies });
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <Label>Introduction</Label>
                                <Textarea
                                    value={content.bodyCopy.intro}
                                    onChange={(e) => setContent({ ...content, bodyCopy: { ...content.bodyCopy, intro: e.target.value } })}
                                />
                            </CardContent>
                        </Card>

                        {/* Add more fields as needed */}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
