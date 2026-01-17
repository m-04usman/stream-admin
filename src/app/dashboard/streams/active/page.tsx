"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/store/useDataStore";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/useAuthStore";
import { labels } from "@/config/labels";
import { Users, StopCircle, Skull, AlertOctagon } from "lucide-react";

export default function ActiveStreamsPage() {
    const { streams, updateData, loading } = useDataStore();
    const openModal = useModalStore(state => state.openModal);
    const hasPermission = useAuthStore(state => state.hasPermission);

    if (loading) return null;

    const activeStreams = streams.filter(s => s.status === "active");

    const handleStop = (stream: any) => {
        openModal({
            type: "delete",
            title: "Force Stop Stream",
            data: stream,
            content: <p>Are you sure you want to forcibly terminate <strong>{stream.title}</strong>?</p>,
            onConfirm: () => updateData("streams", "update", { ...stream, status: "past" })
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{labels.streams.activeTitle}</h1>
                        <p className="text-muted-foreground">Currently live broadcasts on your platform.</p>
                    </div>
                    <Badge variant="destructive" className="animate-pulse">Live Now: {activeStreams.length}</Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {activeStreams.map((stream) => (
                        <Card key={stream.id}>
                            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                                <div className="absolute top-2 left-2 px-2 py-1 bg-destructive text-[10px] font-bold rounded animate-pulse">LIVE</div>
                                <div className="text-muted-foreground flex items-center gap-2">
                                    <Users size={16} />
                                    {stream.viewers} viewers
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{stream.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">by <span className="text-foreground">@{stream.streamer}</span></p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    {hasPermission("streams.warn") && (
                                        <Button variant="outline" size="sm" className="w-full justify-start text-orange-500 hover:text-orange-600" onClick={() => openModal({ type: "custom", title: "Send Warning", content: <p>Sending warning to streamer...</p> })}>
                                            <AlertOctagon size={16} className="mr-2" />
                                            Warn Streamer
                                        </Button>
                                    )}
                                    {hasPermission("streams.stop") && (
                                        <Button variant="outline" size="sm" className="w-full justify-start text-destructive hover:bg-destructive shadow-none" onClick={() => handleStop(stream)}>
                                            <StopCircle size={16} className="mr-2" />
                                            Stop Stream
                                        </Button>
                                    )}
                                    {hasPermission("users.block") && (
                                        <Button variant="outline" size="sm" className="w-full justify-start text-destructive bg-destructive/10 border-destructive/20" onClick={() => updateData("users", "update", { name: stream.streamer, status: "Blocked" })}>
                                            <Skull size={16} className="mr-2" />
                                            Block Streamer
                                        </Button>
                                    )}
                                    {!hasPermission("streams.warn") && !hasPermission("streams.stop") && !hasPermission("users.block") && (
                                        <p className="text-xs text-center w-full text-muted-foreground italic">Monitor only mode</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
