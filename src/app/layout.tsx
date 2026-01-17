import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "@/styles/globals.css";
import { StoreInitializer } from "@/components/providers/StoreInitializer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
    title: "StreamAdmin - Premium Streaming Dashboard",
    description: "Modern streaming-app administration panel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
                <StoreInitializer />
                {children}
            </body>
        </html>
    );
}
