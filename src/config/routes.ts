export const routes = {
    dashboard: {
        home: "/dashboard",
        users: "/dashboard/users",
        posts: {
            all: "/dashboard/posts/all",
            comments: "/dashboard/posts/comments",
        },
        streams: {
            active: "/dashboard/streams/active",
            scheduled: "/dashboard/streams/scheduled",
            past: "/dashboard/streams/past",
        },
        reports: "/dashboard/reports",
        moderationLogs: "/dashboard/moderation-logs",
        analytics: "/dashboard/analytics",
        settings: {
            appConfig: "/dashboard/settings/app-config",
            roles: "/dashboard/settings/roles-permissions",
            notifications: "/dashboard/settings/notifications",
        },
    },
};
