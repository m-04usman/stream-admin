"use client";

import { create } from "zustand";
import usersData from "@/data/users.json";
import settingsData from "@/data/settings.json";
import { toast } from "sonner";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    // Authenticate user with email and password
    login: (email: string, password: string) => Promise<boolean>;
    // Clear user session
    logout: () => void;
    // Check if user has a specific permission
    hasPermission: (permission: string) => boolean;
    // Check if user can access a specific route
    canAccessRoute: (path: string) => boolean;
    // Initialize user from localStorage
    initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,

    initAuth: () => {
        const savedUser = localStorage.getItem("stream_admin_user");
        if (savedUser) set({ user: JSON.parse(savedUser) });
        set({ isLoading: false });
    },

    login: async (email, password) => {
        const foundUser = usersData.find(u => u.email === email && u.password === password);
        if (foundUser) {
            if (foundUser.status !== "Active") {
                toast.error("Your account is blocked. Please contact support.");
                return false;
            }
            const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role, status: foundUser.status };
            set({ user: userData });
            localStorage.setItem("stream_admin_user", JSON.stringify(userData));
            toast.success(`Welcome back, ${foundUser.name}!`);
            return true;
        }
        toast.error("Invalid credentials.");
        return false;
    },

    logout: () => {
        set({ user: null });
        localStorage.removeItem("stream_admin_user");
        toast.info("Logged out successfully");
    },

    hasPermission: (permission) => {
        const { user } = get();
        if (!user) return false;
        const roleConfig = settingsData.roles.find(r => r.role === user.role);
        const perms = roleConfig ? roleConfig.permissions : [];
        return perms.includes("all") || perms.includes(permission);
    },

    canAccessRoute: (path) => {
        const { user } = get();
        if (!user) return false;
        const roleConfig = settingsData.roles.find(r => r.role === user.role);
        const perms = roleConfig ? roleConfig.permissions : [];
        if (perms.includes("all")) return true;

        if (path.includes("/users")) return perms.includes("users.view");
        if (path.includes("/posts")) return perms.includes("posts.view") || perms.includes("posts.hide");
        if (path.includes("/streams")) return perms.includes("streams.view") || perms.includes("streams.stop");
        if (path.includes("/reports")) return perms.includes("reports.view");
        if (path.includes("/analytics")) return perms.includes("analytics.view");
        if (path.includes("/settings")) return perms.includes("settings.view");

        return true;
    }
}));
