"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/config/sidebar";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { theme } from "@/config/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/Button";

export const Sidebar = () => {
    const pathname = usePathname();
    const { user, logout, canAccessRoute } = useAuthStore();

    const IconComponent = ({ name, size = 20, className }: { name: string; size?: number; className?: string }) => {
        const Icon = (Icons as any)[name];
        return Icon ? <Icon size={size} className={className} /> : null;
    };

    if (!user) return null;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card/50 backdrop-blur-xl transition-transform lg:translate-x-0 -translate-x-full">
            <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
                <div className="mb-10 flex items-center px-2 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                        <Icons.Zap size={24} fill="currentColor" />
                    </div>
                    <span className="ml-3 text-xl font-bold tracking-tight">StreamAdmin</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {sidebarConfig.map((item: any) => {
                        // Check if parent or any child is accessible
                        const hasAccessibleChild = item.children?.some((child: any) => canAccessRoute(child.href));
                        const isPrimaryAccessible = item.href ? canAccessRoute(item.href) : hasAccessibleChild;

                        if (!isPrimaryAccessible) return null;

                        return (
                            <div key={item.label} className="space-y-1">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 group rounded-lg",
                                            pathname === item.href
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        )}
                                    >
                                        <IconComponent name={item.icon || ""} className="mr-3" />
                                        {item.label}
                                    </Link>
                                ) : (
                                    <div className="space-y-1">
                                        <div className="flex items-center px-4 py-3 text-sm font-medium text-muted-foreground">
                                            <IconComponent name={item.icon || ""} className="mr-3" />
                                            {item.label}
                                        </div>
                                        <div className="ml-4 space-y-1 border-l border-border pl-4">
                                            {item.children?.map((child: any) => {
                                                if (!canAccessRoute(child.href)) return null;
                                                return (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className={cn(
                                                            "flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                                                            pathname === child.href
                                                                ? "text-primary bg-primary/10"
                                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                                        )}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="mt-auto border-t border-border pt-4 px-2 space-y-4">
                    <div className="flex items-center gap-3 py-2">
                        <div className="h-10 w-10 rounded-full bg-secondary overflow-hidden ring-2 ring-primary/20 shrink-0">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold truncate">{user.name}</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{user.role}</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={logout}
                    >
                        <Icons.LogOut size={16} className="mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </aside>
    );
};
