"use client";

import { create } from "zustand";
import { toast } from "sonner";

interface DataState {
    users: any[];
    posts: any[];
    comments: any[];
    streams: any[];
    reports: any[];
    logs: any[];
    analytics: any;
    settings: any;
    loading: boolean;
    // Load initial data from JSON files
    loadData: () => Promise<void>;
    // Update data globally (create, update, delete)
    updateData: (type: string, action: string, payload: any) => void;
}

export const useDataStore = create<DataState>((set) => ({
    users: [],
    posts: [],
    comments: [],
    streams: [],
    reports: [],
    logs: [],
    analytics: {},
    settings: {},
    loading: true,

    loadData: async () => {
        try {
            const [u, p, c, s, r, l, a, st] = await Promise.all([
                import("@/data/users.json"),
                import("@/data/posts.json"),
                import("@/data/comments.json"),
                import("@/data/streams.json"),
                import("@/data/reports.json"),
                import("@/data/moderationLogs.json"),
                import("@/data/analytics.json"),
                import("@/data/settings.json"),
            ]);
            set({
                users: u.default,
                posts: p.default,
                comments: c.default,
                streams: s.default,
                reports: r.default,
                logs: l.default,
                analytics: a.default,
                settings: st.default,
                loading: false
            });
        } catch (error) {
            console.error("Failed to load data", error);
            set({ loading: false });
        }
    },

    updateData: (type, action, payload) => {
        set((state) => {
            const currentList = (state as any)[type];
            if (!currentList || !Array.isArray(currentList)) return state;

            let newList = [...currentList];
            if (action === "delete") newList = newList.filter(item => item.id !== payload.id);
            if (action === "update") newList = newList.map(item => item.id === payload.id ? { ...item, ...payload } : item);
            if (action === "create") newList = [...newList, { ...payload, id: Math.random().toString(36).substr(2, 9) }];

            return { ...state, [type]: newList };
        });
        toast.success(`${type} ${action}d successfully`);
    }
}));
