"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import { Button } from "./Button";
import { theme } from "@/config/theme";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = () => {
    const { modal, closeModal } = useModalStore();

    if (!modal.isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative w-full max-w-lg overflow-hidden bg-card border border-border shadow-2xl glass"
                    style={{ borderRadius: theme.borderRadius.lg }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <h2 className="text-xl font-semibold">{modal.title}</h2>
                        <button
                            onClick={closeModal}
                            className="p-2 transition-colors rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto max-h-[70vh]">
                        {modal.content}
                    </div>

                    {modal.type !== "view" && (
                        <div className="flex justify-end gap-3 p-6 border-t border-border bg-muted/20">
                            <Button variant="ghost" onClick={closeModal}>
                                Cancel
                            </Button>
                            {modal.onConfirm && (
                                <Button
                                    variant={modal.type === "delete" ? "destructive" : "primary"}
                                    onClick={() => {
                                        modal.onConfirm?.(modal.data);
                                        closeModal();
                                    }}
                                >
                                    {modal.type === "delete" ? "Delete" : "Confirm"}
                                </Button>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
