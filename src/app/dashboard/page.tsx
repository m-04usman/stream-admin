"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { useDataStore } from "@/store/useDataStore";
import { labels } from "@/config/labels";
import { Users, Tv, AlertCircle, DollarSign, TrendingUp } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

export default function DashboardOverview() {
    const { analytics, logs, loading } = useDataStore();

    if (loading) return null;

    const stats = [
        { label: labels.dashboard.totalUsers, value: analytics.summary.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: labels.dashboard.activeStreams, value: analytics.summary.activeStreams, icon: Tv, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: labels.dashboard.pendingReports, value: analytics.summary.pendingReports, icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-500/10" },
        { label: labels.dashboard.revenue, value: `$${analytics.summary.revenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.dashboard.welcome}</h1>
                    <p className="text-muted-foreground">Here is what is happening with your streaming platform today.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.label}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                    </div>
                                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-xs text-emerald-500">
                                    <TrendingUp size={12} className="mr-1" />
                                    <span>+12% from last week</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Platform Growth</CardTitle>
                            <CardDescription>Daily active users over the last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analytics.chartData}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                                    <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px" }}
                                        itemStyle={{ color: "#fafafa" }}
                                    />
                                    <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest moderation actions taken</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {logs.slice(0, 5).map((log) => (
                                    <div key={log.id} className="flex items-start gap-4">
                                        <div className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                                        <div>
                                            <p className="text-sm font-medium">{log.action}</p>
                                            <p className="text-xs text-muted-foreground">
                                                by <span className="text-foreground">{log.admin}</span> • {new Date(log.timestamp).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
