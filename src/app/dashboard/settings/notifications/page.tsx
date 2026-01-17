"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { labels } from "@/config/labels";
import { useDataStore } from "@/store/useDataStore";
import { Mail, BellRing, Smartphone } from "lucide-react";

export default function NotificationsPage() {
    const { settings, loading } = useDataStore();

    if (loading) return null;

    const channels = [
        { id: "email", name: "Email Notifications", desc: "Receive alerts for critical system events via email.", icon: Mail, enabled: settings.notifications.emailEnabled },
        { id: "push", name: "Push Notifications", desc: "Get real-time browser alerts when active.", icon: BellRing, enabled: settings.notifications.pushEnabled },
        { id: "sms", name: "SMS Alerts", desc: "Emergency notifications sent directly to your mobile.", icon: Smartphone, enabled: settings.notifications.smsEnabled },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.settings.notifications}</h1>
                    <p className="text-muted-foreground">Configure how you and other moderators receive updates.</p>
                </div>

                <div className="space-y-4">
                    {channels.map((channel) => (
                        <Card key={channel.id}>
                            <CardContent className="flex items-center gap-6 p-6">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <channel.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold">{channel.name}</h3>
                                    <p className="text-sm text-muted-foreground">{channel.desc}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{channel.enabled ? "Active" : "Disabled"}</span>
                                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${channel.enabled ? "bg-primary" : "bg-muted"}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${channel.enabled ? "translate-x-6" : ""}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <Button>Save Preferences</Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
