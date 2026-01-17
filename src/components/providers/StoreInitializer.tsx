"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useDataStore } from "@/store/useDataStore";

export const StoreInitializer = () => {
    const initAuth = useAuthStore(state => state.initAuth);
    const loadData = useDataStore(state => state.loadData);

    useEffect(() => {
        // Initialize authentication from localStorage
        initAuth();
        // Load initial data from JSON files
        loadData();
    }, [initAuth, loadData]);

    return null;
};
