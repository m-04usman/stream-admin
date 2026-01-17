"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { labels } from "@/config/labels";
import { useDataStore } from "@/store/useDataStore";
import { Shield, Key } from "lucide-react";

export default function RolesPermissionsPage() {
    const { settings, loading } = useDataStore();

    if (loading) return null;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.settings.roles}</h1>
                    <p className="text-muted-foreground">Manage user roles and their associated permission матрих.</p>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="text-primary" size={20} />
                            <CardTitle>Permission Matrix</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Permissions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {settings.roles.map((item: any) => (
                                    <TableRow key={item.role}>
                                        <TableCell className="font-semibold">{item.role}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-2">
                                                {item.permissions.map((p: string) => (
                                                    <Badge key={p} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                                        <Key size={10} className="mr-1" />
                                                        {p}
                                                    </Badge>
                                                ))}
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
