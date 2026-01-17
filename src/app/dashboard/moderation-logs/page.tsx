"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { useDataStore } from "@/store/useDataStore";
import { labels } from "@/config/labels";
import { ShieldCheck, History } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ModerationLogsPage() {
    const { logs, loading } = useDataStore();

    if (loading) return null;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.sidebar.moderationLogs}</h1>
                    <p className="text-muted-foreground">Read-only audit trail of all staff actions.</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Moderator</TableHead>
                                    <TableHead>Action Taken</TableHead>
                                    <TableHead>Timestamp</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="bg-primary/20 p-1.5 rounded text-primary">
                                                    <ShieldCheck size={14} />
                                                </div>
                                                <span className="font-medium">{log.admin}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-foreground/90">{log.action}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <History size={14} />
                                                {formatDate(log.timestamp)}
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
