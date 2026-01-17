"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/store/useDataStore";
import { labels } from "@/config/labels";
import { ShieldCheck, ShieldAlert, Trash2 } from "lucide-react";

export default function CommentsPage() {
    const { comments, loading } = useDataStore();

    if (loading) return null;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.posts.commentsTitle}</h1>
                    <p className="text-muted-foreground">Manage and moderate user comments across sessions.</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Comment</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comments.map((comment) => (
                                    <TableRow key={comment.id}>
                                        <TableCell className="font-medium">@{comment.user}</TableCell>
                                        <TableCell className="max-w-md truncate">{comment.content}</TableCell>
                                        <TableCell>
                                            <Badge variant={comment.status === "Approved" ? "success" : "destructive"}>
                                                {comment.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="text-emerald-500">
                                                    <ShieldCheck size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-orange-500">
                                                    <ShieldAlert size={16} />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive">
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
