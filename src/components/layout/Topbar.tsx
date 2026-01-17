"use client";

import React from "react";
import { Search, Bell, Menu, Settings } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const Topbar = () => {
    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-background/60 px-6 backdrop-blur-xl">
            <div className="flex flex-1 items-center max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                        placeholder="Search across dashboard..."
                        className="pl-10 bg-secondary/30 border-none ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings size={20} />
                </Button>
                <div className="ml-2 h-8 w-[1px] bg-border mx-2" />
                <Button variant="primary" size="sm" className="hidden sm:flex">
                    Go Live
                </Button>
            </div>
        </header>
    );
};
