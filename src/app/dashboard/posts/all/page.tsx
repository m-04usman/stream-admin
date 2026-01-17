"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useDataStore } from "@/store/useDataStore";
import { useModalStore } from "@/store/useModalStore";
import { useAuthStore } from "@/store/useAuthStore";
import { labels } from "@/config/labels";
import { Eye, Edit3, Trash2, Heart, MessageSquare, AlertCircle, EyeOff } from "lucide-react";

export default function AllPostsPage() {
    const { posts, updateData, loading } = useDataStore();
    const openModal = useModalStore(state => state.openModal);
    const hasPermission = useAuthStore(state => state.hasPermission);

    if (loading) return null;

    const handleToggleHide = (post: any) => {
        updateData("posts", "update", { ...post, status: post.status === "Visible" ? "Hidden" : "Visible" });
    };

    const handleDelete = (post: any) => {
        openModal({
            type: "delete",
            title: "Delete Post",
            data: post,
            content: <p>Are you sure you want to permanently delete this post?</p>,
            onConfirm: () => updateData("posts", "delete", post)
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{labels.posts.title}</h1>
                    <p className="text-muted-foreground">Monitor and moderate all content uploaded to the platform.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Card key={post.id} className={post.status === "Hidden" ? "opacity-60" : ""}>
                            <div className="aspect-video w-full bg-secondary/50 relative group">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <Button variant="secondary" size="sm">
                                        <Eye size={16} className="mr-2" />
                                        Preview
                                    </Button>
                                </div>
                                {post.reports > 0 && (
                                    <Badge variant="destructive" className="absolute top-2 right-2">
                                        <AlertCircle size={12} className="mr-1" />
                                        {post.reports} Reports
                                    </Badge>
                                )}
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant={post.status === "Visible" ? "success" : "secondary"}>
                                        {post.status}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">ID: {post.id}</span>
                                </div>
                                <CardTitle className="text-lg mt-2 line-clamp-1">{post.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">by <span className="text-foreground">@{post.author}</span></p>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Heart size={14} className="text-rose-500" />
                                        {post.likes}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={14} className="text-blue-500" />
                                        {post.comments}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="gap-2 border-t border-border pt-4 bg-muted/10">
                                {hasPermission("posts.hide") && (
                                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleToggleHide(post)}>
                                        {post.status === "Visible" ? <><EyeOff size={14} className="mr-2" /> Hide</> : <><Eye size={14} className="mr-2" /> Show</>}
                                    </Button>
                                )}
                                {hasPermission("posts.delete") && (
                                    <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:text-destructive" onClick={() => handleDelete(post)}>
                                        <Trash2 size={14} className="mr-2" />
                                        Delete
                                    </Button>
                                )}
                                {!hasPermission("posts.hide") && !hasPermission("posts.delete") && (
                                    <p className="text-xs text-center w-full text-muted-foreground italic">No actions allowed</p>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
