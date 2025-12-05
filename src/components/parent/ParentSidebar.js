// src/components/ParentSidebar.js
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    TrendingUp,
    CalendarDays,
    BookOpen,
    Calendar,
    Settings,
    LogOut,
    School
} from 'lucide-react';

// ParentSidebar component accepts 'userName' and 'userRole' as props
export default function ParentSidebar({ userName = 'Parent', userRole = 'Parent' }) {
    const pathname = usePathname() || '/dashboard/home';

    const menuItems = [
        { href: '/dashboard/home', icon: Home, label: 'Home' },
        { href: '/dashboard/performance', icon: TrendingUp, label: "Child's Performance" },
        { href: '/dashboard/attendance', icon: CalendarDays, label: 'Attendance' },
        { href: '/dashboard/fee-status', icon: BookOpen, label: 'Fee Status' },
        { href: '/dashboard/events', icon: Calendar, label: 'Events' },
        { href: '/dashboard/settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-100 p-4 hidden lg:flex flex-col shadow-sm overflow-y-auto z-40">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-8 px-2">
                <School size={28} className="text-purple-600" />
                <div className="font-semibold text-xl text-gray-800">School</div>
            </div>

            {/* Menu Section */}
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-3">MENU</div>

            {/* Navigation Items */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm cursor-pointer ${isActive
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon
                                    size={20}
                                    className={isActive ? 'text-purple-600' : 'text-gray-500'}
                                />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Info and Logout Section */}
            <div className="mt-auto">
                <div className="p-3 border-t border-gray-100">
                    <p className="font-semibold text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">{userRole}</p>
                </div>

                <Link href="/logout">
                    <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </div>
                </Link>
            </div>
        </aside>
    );
}
