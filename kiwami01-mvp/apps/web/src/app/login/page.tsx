"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"
// import { authenticate } from "@/lib/actions" 
// We would implement a server action for login, but for now we can use a simple form submit or just assume NextAuth handles it via /api/auth/signin

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-[350px] border-primary/20">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-serif">Kiwami Cloud</CardTitle>
                    <CardDescription>Enter your email to sign in</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Simple form pointing to standard NextAuth signin for MVP simplicity */}
                    {/* In a real app, use a server action `dispatch(authenticate)` */}
                    <form action="/api/auth/signin/credentials" method="POST" className="space-y-4">
                        <Input name="email" type="email" placeholder="name@example.com" required />
                        <Input name="password" type="password" placeholder="Password" required />
                        <input type="hidden" name="redirectTo" value="/dashboard/lp/new" />
                        <Button type="submit" className="w-full bg-primary text-primary-foreground">
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-xs text-muted-foreground">
                        <p>For MVP: Use any email. Password check is mocked.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
