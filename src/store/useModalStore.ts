"use client";

import { create } from "zustand";
import { ReactNode } from "react";

type ModalType = "create" | "update" | "delete" | "view" | "custom";

interface ModalState {
    isOpen: boolean;
    type: ModalType;
    title: string;
    content: ReactNode;
    data?: any;
    onConfirm?: (data?: any) => void;
}

interface ModalStore {
    modal: ModalState;
    // Open a modal with specific configuration
    openModal: (params: Omit<ModalState, "isOpen">) => void;
    // Close the currently active modal
    closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modal: {
        isOpen: false,
        type: "view",
        title: "",
        content: null,
    },
    openModal: (params) => set({ modal: { ...params, isOpen: true } }),
    closeModal: () => set((state) => ({ modal: { ...state.modal, isOpen: false } })),
}));
