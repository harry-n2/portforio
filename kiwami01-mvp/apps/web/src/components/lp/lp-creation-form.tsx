"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Sparkles, ChevronRight, Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    industry: z.string().min(2, "Industry is required"),
    productName: z.string().min(2, "Product name is required"),
    mainBenefit: z.string().min(10, "Main benefit should be descriptive"),
    targetAudience: z.object({
        age: z.string().optional(),
        gender: z.string().optional(),
        occupation: z.string().optional(),
        painPoints: z.string().optional(), // Will split by line
    }),
    designTheme: z.enum(["gorgeous", "minimal", "corporate", "casual", "tech"]),
})

export function LPCreationForm() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            industry: "",
            productName: "",
            mainBenefit: "",
            targetAudience: {
                age: "",
                gender: "",
                occupation: "",
                painPoints: "",
            },
            designTheme: "gorgeous",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/lp/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...values,
                    targetAudience: {
                        ...values.targetAudience,
                        painPoints: values.targetAudience.painPoints
                            ? values.targetAudience.painPoints.split("\n").filter(Boolean)
                            : undefined,
                    },
                }),
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || "Failed to generate")

            toast.success("LP Content Generated Successfully!")
            // Redirect to preview or handle data
            console.log("Generated:", data)
            // window.location.href = `/dashboard/lp/${data.lpId}/edit` // Logic to be implemented
        } catch (error) {
            toast.error("Generation Failed. Please try again.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const nextStep = async () => {
        // Validate current step fields before moving next
        let isValid = false
        if (step === 1) {
            isValid = await form.trigger(["industry", "productName", "mainBenefit"])
        } else if (step === 2) {
            isValid = await form.trigger(["targetAudience"])
        }

        if (isValid) setStep(step + 1)
    }

    const prevStep = () => setStep(step - 1)

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-serif text-primary mb-2">Create Your Masterpiece</h1>
                <p className="text-muted-foreground">AI-powered generation of world-class landing pages.</p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center mb-10 gap-4">
                {[1, 2, 3].map((s) => (
                    <div key={s} className={`flex items-center gap-2 ${step >= s ? "text-primary" : "text-muted-foreground"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= s ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground"}`}>
                            {step > s ? <Check className="w-4 h-4" /> : s}
                        </div>
                        <span className="hidden sm:inline font-medium text-sm">
                            {s === 1 ? "Product Info" : s === 2 ? "Target Audience" : "Design & Generate"}
                        </span>
                        {s < 3 && <div className="h-[1px] w-8 bg-border ml-2" />}
                    </div>
                ))}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Basic Information</CardTitle>
                                        <CardDescription>Tell us about your product or service.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="industry"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Industry</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. SaaS, Real Estate, Beauty" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="productName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Product/Service Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Kiwami Cloud" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="mainBenefit"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Main Benefit (USP)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="What is the single most important value you provide?"
                                                            className="h-24 resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Target Audience</CardTitle>
                                        <CardDescription>Who are you trying to reach?</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="targetAudience.age"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Age Range</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. 25-40" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="targetAudience.gender"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Gender</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="all">All</SelectItem>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>
                                                                <SelectItem value="corporate">Corporate (B2B)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="targetAudience.occupation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Occupation / Role</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Marketing Managers, Freelancers" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="targetAudience.painPoints"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pain Points (One per line)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Lack of time&#10;Low conversion rates&#10;Complex tools"
                                                            className="h-32"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Design & Generate</CardTitle>
                                        <CardDescription>Choose the aesthetic for your masterpiece.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="designTheme"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Design Theme</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-16">
                                                                <SelectValue placeholder="Select a theme" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="gorgeous" className="py-3">
                                                                <span className="font-serif font-bold text-primary block">WTN Gorgeous</span>
                                                                <span className="text-xs text-muted-foreground">The signature high-end gold & navy style.</span>
                                                            </SelectItem>
                                                            <SelectItem value="minimal" className="py-3">
                                                                <span className="font-sans font-bold block">Minimal Prestige</span>
                                                                <span className="text-xs text-muted-foreground">Clean, sophisticated, and effective.</span>
                                                            </SelectItem>
                                                            <SelectItem value="corporate" className="py-3">
                                                                <span className="font-bold block">Trust Corporate</span>
                                                                <span className="text-xs text-muted-foreground">Reliable B2B professional look.</span>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormDescription>
                                                        "Gorgeous" is recommended for high-ticket services.
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-between pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={step === 1 || isLoading}
                            className={step === 1 ? "invisible" : ""}
                        >
                            Back
                        </Button>

                        {step < 3 ? (
                            <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]">
                                Next <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px]">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" /> Generate LP
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
}
