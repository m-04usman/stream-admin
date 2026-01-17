"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { useDataStore } from "@/store/useDataStore";
import { labels } from "@/config/labels";
import { Calendar, Edit, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ScheduledStreamsPage() {
    const { streams, loading } = useDataStore();

    if (loading) return null;

    const scheduledStreams = streams.filter(s => s.status === "scheduled");

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.streams.scheduledTitle}</h1>
                    <p className="text-muted-foreground">Upcoming broadcasts planned by creators.</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Stream Details</TableHead>
                                    <TableHead>Start Time</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scheduledStreams.map((stream) => (
                                    <TableRow key={stream.id}>
                                        <TableCell>
                                            <div className="font-medium">{stream.title}</div>
                                            <div className="text-xs text-muted-foreground">by @{stream.streamer}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-primary" />
                                                {formatDate(stream.startTime)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Edit size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive">
                                                    <XCircle size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
