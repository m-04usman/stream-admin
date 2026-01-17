"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useDataStore } from "@/store/useDataStore";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/useAuthStore";
import { labels } from "@/config/labels";
import { UserPlus, Search, Shield, ShieldOff, Trash2, Edit2 } from "lucide-react";

export default function UsersPage() {
    const { users, updateData, loading } = useDataStore();
    const openModal = useModalStore(state => state.openModal);
    const hasPermission = useAuthStore(state => state.hasPermission);
    const [searchTerm, setSearchTerm] = useState("");

    if (loading) return null;

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        openModal({
            type: "create",
            title: "Add New User",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input id="new-user-name" placeholder="Full Name" />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input id="new-user-email" type="email" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Role</label>
                        <select id="new-user-role" className="w-full bg-background border border-input rounded-md h-10 px-3">
                            <option>User</option>
                            <option>Moderator</option>
                            <option>Admin</option>
                        </select>
                    </div>
                </div>
            ),
            onConfirm: () => {
                const name = (document.getElementById("new-user-name") as HTMLInputElement).value;
                const email = (document.getElementById("new-user-email") as HTMLInputElement).value;
                const role = (document.getElementById("new-user-role") as HTMLSelectElement).value;
                updateData("users", "create", { name, email, role, status: "Active" });
            }
        });
    };

    const handleEdit = (user: any) => {
        openModal({
            type: "update",
            title: "Edit User",
            data: user,
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input id="edit-user-name" defaultValue={user.name} />
                    </div>
                    <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input id="edit-user-email" defaultValue={user.email} />
                    </div>
                </div>
            ),
            onConfirm: () => {
                const name = (document.getElementById("edit-user-name") as HTMLInputElement).value;
                const email = (document.getElementById("edit-user-email") as HTMLInputElement).value;
                updateData("users", "update", { ...user, name, email });
            }
        });
    };

    const handleDelete = (user: any) => {
        openModal({
            type: "delete",
            title: "Delete User",
            data: user,
            content: <p className="text-muted-foreground">{labels.users.deleteConfirm}</p>,
            onConfirm: () => updateData("users", "delete", user)
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{labels.users.title}</h1>
                        <p className="text-muted-foreground">Manage your platform users and their permissions.</p>
                    </div>
                    {hasPermission("users.create") && (
                        <Button onClick={handleCreate}>
                            <UserPlus size={18} className="mr-2" />
                            Add User
                        </Button>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <Input
                                placeholder="Search users..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === "Active" ? "success" : "destructive"}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                {hasPermission("users.edit") && (
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                                                        <Edit2 size={16} />
                                                    </Button>
                                                )}
                                                {hasPermission("users.block") && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateData("users", "update", { ...user, status: user.status === "Active" ? "Blocked" : "Active" })}
                                                        className={user.status === "Active" ? "text-orange-500" : "text-emerald-500"}
                                                    >
                                                        {user.status === "Active" ? <ShieldOff size={16} /> : <Shield size={16} />}
                                                    </Button>
                                                )}
                                                {hasPermission("users.delete") && (
                                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(user)}>
                                                        <Trash2 size={16} />
                                                    </Button>
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
