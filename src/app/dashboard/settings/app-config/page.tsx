"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { labels } from "@/config/labels";
import { useDataStore } from "@/store/useDataStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function AppConfigPage() {
    const { settings, loading } = useDataStore();
    const { user } = useAuthStore();

    if (loading) return null;

    const isAdmin = user?.role === "Admin";

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.settings.appConfig}</h1>
                    <p className="text-muted-foreground">Adjust global system parameters and platform behavior.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Maintenance Mode</CardTitle>
                        <CardDescription>When enabled, only admins can access the site.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-sm">Status: {settings.appConfig.maintenanceMode ? "Enabled" : "Disabled"}</span>
                        {isAdmin && (
                            <Button variant={settings.appConfig.maintenanceMode ? "primary" : "outline"}>
                                {settings.appConfig.maintenanceMode ? "Disable" : "Enable"}
                            </Button>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Streaming Constraints</CardTitle>
                        <CardDescription>Global limits for streaming quality.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Max Bitrate (kbps)</label>
                            <Input type="number" defaultValue={settings.appConfig.maxStreamBitrate} disabled={!isAdmin} />
                        </div>
                        {isAdmin && <Button>Save Bitrate</Button>}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
