"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { labels } from "@/config/labels";
import { Zap, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const login = useAuthStore(state => state.login);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await login(email, password);
        if (success) {
            router.push("/dashboard");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen grow flex items-center justify-center bg-background gradient-bg p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 mb-4 scale-110">
                        <Zap size={28} fill="currentColor" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">StreamAdmin</h1>
                    <p className="text-muted-foreground font-medium">Global broadcast control center</p>
                </div>

                <Card className="border-border/50 bg-card/40 backdrop-blur-2xl shadow-2xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-bold">{labels.common.login}</CardTitle>
                        <CardDescription>
                            Enter credentials to access the moderation dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">{labels.common.email}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <Input
                                        type="email"
                                        placeholder="admin@stream.com"
                                        className="pl-10 h-12"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold">{labels.common.password}</label>
                                    <a href="#" className="text-xs text-primary hover:underline font-medium">
                                        {labels.common.forgotPassword}
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-12"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold mt-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <Loader2 className="mr-2 animate-spin" size={20} />
                                ) : (
                                    labels.common.signIn
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-border flex flex-col gap-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-2">Test Credentials</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-[10px] p-2 bg-secondary/50 rounded-lg border border-border/50">
                                    <span className="block font-bold text-foreground">Admin:</span>
                                    <span className="opacity-70">admin@stream.com</span>
                                </div>
                                <div className="text-[10px] p-2 bg-secondary/50 rounded-lg border border-border/50">
                                    <span className="block font-bold text-foreground">Mod:</span>
                                    <span className="opacity-70">mod@stream.com</span>
                                </div>
                            </div>
                            <p className="text-[10px] text-center text-muted-foreground italic">Password: password123</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
