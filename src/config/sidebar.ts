import { routes } from "./routes";
import { labels } from "./labels";

export const sidebarConfig = [
    {
        label: labels.sidebar.dashboard,
        icon: "LayoutDashboard",
        href: routes.dashboard.home,
    },
    {
        label: labels.sidebar.users,
        icon: "Users",
        href: routes.dashboard.users,
    },
    {
        label: labels.sidebar.posts,
        icon: "FileText",
        children: [
            { label: labels.sidebar.allPosts, href: routes.dashboard.posts.all },
            { label: labels.sidebar.comments, href: routes.dashboard.posts.comments },
        ],
    },
    {
        label: labels.sidebar.streams,
        icon: "Tv",
        children: [
            { label: labels.sidebar.activeStreams, href: routes.dashboard.streams.active },
            { label: labels.sidebar.scheduledStreams, href: routes.dashboard.streams.scheduled },
            { label: labels.sidebar.pastStreams, href: routes.dashboard.streams.past },
        ],
    },
    {
        label: labels.sidebar.reports,
        icon: "AlertTriangle",
        href: routes.dashboard.reports,
    },
    {
        label: labels.sidebar.moderationLogs,
        icon: "ShieldCheck",
        href: routes.dashboard.moderationLogs,
    },
    {
        label: labels.sidebar.analytics,
        icon: "BarChart3",
        href: routes.dashboard.analytics,
    },
    {
        label: labels.sidebar.settings,
        icon: "Settings",
        children: [
            { label: labels.sidebar.appConfig, href: routes.dashboard.settings.appConfig },
            { label: labels.sidebar.rolesPermissions, href: routes.dashboard.settings.roles },
            { label: labels.sidebar.notifications, href: routes.dashboard.settings.notifications },
        ],
    },
];
