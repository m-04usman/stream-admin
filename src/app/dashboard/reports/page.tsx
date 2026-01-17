"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/store/useDataStore";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/useAuthStore";
import { labels } from "@/config/labels";
import { CheckCircle2, XCircle, Info } from "lucide-react";

export default function ReportsPage() {
    const { reports, updateData, loading } = useDataStore();
    const openModal = useModalStore(state => state.openModal);
    const hasPermission = useAuthStore(state => state.hasPermission);

    if (loading) return null;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.reports.title}</h1>
                    <p className="text-muted-foreground">Moderation queue for user-reported content.</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Target Content</TableHead>
                                    <TableHead>Reporter</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.map((report) => (
                                    <TableRow key={report.id}>
                                        <TableCell className="font-medium text-destructive">{report.type}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">{report.target}</Badge>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openModal({ type: "view", title: "Content Details", content: <p>Viewing details for {report.target}...</p> })}>
                                                    <Info size={14} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>@{report.reporter}</TableCell>
                                        <TableCell>
                                            <Badge variant={report.status === "Pending" ? "secondary" : "default"}>
                                                {report.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {hasPermission("reports.resolve") ? (
                                                    <>
                                                        <Button variant="ghost" size="sm" className="text-emerald-500 hover:text-emerald-600" onClick={() => updateData("reports", "update", { ...report, status: "Resolved" })}>
                                                            <CheckCircle2 size={16} className="mr-2" />
                                                            Resolve
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => updateData("reports", "update", { ...report, status: "Dismissed" })}>
                                                            <XCircle size={16} className="mr-2" />
                                                            Dismiss
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Badge variant="outline">Read Only</Badge>
                                                )}
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
