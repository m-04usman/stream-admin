"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { useDataStore } from "@/store/useDataStore";
import { labels } from "@/config/labels";
import { Play, BarChart2, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PastStreamsPage() {
    const { streams, updateData, loading } = useDataStore();

    if (loading) return null;

    const pastStreams = streams.filter(s => s.status === "past");

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.streams.pastTitle}</h1>
                    <p className="text-muted-foreground">Historical records of finished broadcasts.</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Stream</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pastStreams.map((stream) => (
                                    <TableRow key={stream.id}>
                                        <TableCell>
                                            <div className="font-medium">{stream.title}</div>
                                            <div className="text-xs text-muted-foreground">by @{stream.streamer}</div>
                                        </TableCell>
                                        <TableCell>4h 12m</TableCell>
                                        <TableCell>{formatDate(stream.startTime)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" title="View Analytics">
                                                    <BarChart2 size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" title="Delete Recording" className="text-destructive" onClick={() => updateData("streams", "delete", stream)}>
                                                    <Trash2 size={16} />
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
