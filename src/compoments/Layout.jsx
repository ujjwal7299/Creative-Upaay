import React from "react";

export default function Layout({
    title = "Dashboard",
    subtitle = "Figma Replica • Tasks",
    children,
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Topbar */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-brand-900">{title}</h1>
                    {subtitle ? (
                        <div className="text-sm text-gray-500">{subtitle}</div>
                    ) : null}
                </div>
            </header>

            {/* Page content container */}
            <div className="max-w-7xl mx-auto px-6">{children}</div>
        </div>
    );
}
