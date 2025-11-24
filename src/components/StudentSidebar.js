// src/components/StudentSidebar.js
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import {
    Home,
    BookOpenCheck,
    ClipboardCheck,
    BarChart3,
    CalendarDays,
    GraduationCap,
    Settings,
    LogOut,
    ChevronDown,
    School // 1. Import the School icon
} from 'lucide-react';
import { useState } from 'react';

export default function StudentSidebar() {
    const pathname = usePathname() || '/dashboard/home';
    const { setCurrentUserRole } = useUser();
    const [isRoleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

    const menuItems = [
        { href: '/dashboard/home', icon: Home, label: 'Home' },
        { href: '/dashboard/assignments', icon: ClipboardCheck, label: 'Assignments' },
        { href: '/dashboard/classes', icon: BookOpenCheck, label: 'Classes' },
        { href: '/dashboard/my-results', icon: BarChart3, label: 'My Results' },
        { href: '/dashboard/attendance', icon: CalendarDays, label: 'Attendance' },
        { href: '/dashboard/exams', icon: GraduationCap, label: 'Exams' },
        { href: '/dashboard/settings', icon: Settings, label: 'Settings' }

    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 h-screen p-4 hidden lg:flex flex-col shadow-sm">

            {/* 2. Add the School Logo section */}
            <div className="flex items-center gap-3 mb-8 px-2">
                <School size={28} className="text-purple-600" />
                <div className="font-semibold text-xl text-gray-800">School</div>
            </div>

            {/* 3. Add the "MENU" subheading */}
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-3">MENU</div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} legacyBehavior>
                            <a
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${isActive
                                    ? 'bg-gray-100 text-gray-900 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <item.icon size={20} className="text-gray-500" />
                                <span>{item.label}</span>
                            </a>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <div className="p-3">
                    <p className="font-semibold text-gray-800">John Smith</p>
                    <p className="text-xs text-gray-500">Student</p>
                </div>



                <Link href="/logout" legacyBehavior>
                    <a className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-red-600 hover:bg-red-50">
                        <LogOut size={20} />
                        <span className="text-sm font-medium">Logout</span>
                    </a>
                </Link>
            </div>
        </aside>
    );
}