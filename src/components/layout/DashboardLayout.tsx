"use client";

import React, { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Modal } from "../ui/Modal";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { ShieldAlert, Lock } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading, canAccessRoute, logout } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center font-sans tracking-tight">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Lock className="text-primary" size={24} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Authenticating session...</span>
                </div>
            </div>
        );
    }

    const hasAccess = canAccessRoute(pathname);

    return (
        <div className="min-h-screen bg-background gradient-bg">
            <Sidebar />
            <div className="flex flex-col lg:pl-64">
                <Topbar />
                <main className="relative flex-1 p-6 lg:p-10 min-h-[calc(100vh-64px)] overflow-hidden">
                    <div className={cn("transition-all duration-500", !hasAccess && "blur-xl grayscale pointer-events-none select-none")}>
                        {children}
                    </div>

                    {!hasAccess && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 text-center">
                            <div className="max-w-md space-y-6 bg-card/40 backdrop-blur-3xl p-10 rounded-3xl border border-border shadow-2xl scale-110">
                                <div className="mx-auto h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                                    <ShieldAlert className="text-destructive" size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black tracking-tighter">Access Denied</h2>
                                    <p className="text-muted-foreground font-medium">
                                        Your role <span className="text-primary font-bold">({user.role})</span> doesn't have permissions to view this module.
                                    </p>
                                </div>
                                <div className="pt-4 flex flex-col gap-3">
                                    <Button variant="primary" className="h-12 font-bold" onClick={() => router.push("/dashboard")}>
                                        Return to Dashboard
                                    </Button>
                                    <Button variant="ghost" className="h-12 font-semibold text-muted-foreground" onClick={logout}>
                                        Sign out and switch account
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <Modal />
            <Toaster position="top-right" theme="dark" />
        </div>
    );
};
