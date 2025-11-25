// src/components/SimpleSidebar.js
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import {
    Home,
    ClipboardCheck,
    BarChart3,
    CalendarDays,
    GraduationCap,
    Settings,
    LogOut,
    ChevronDown,
    School
} from 'lucide-react';
import { useState } from 'react';

// The component now accepts 'userName' and 'userRole' as props
export default function SimpleSidebar({ userName, userRole }) {
    const pathname = usePathname() || '/dashboard/home';
    const { setCurrentUserRole } = useUser();
    const [isRoleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

    const menuItems = [
        { href: '/dashboard/home', icon: Home, label: 'Home' },
        { href: '/dashboard/assignments', icon: ClipboardCheck, label: 'Assignments' },
        { href: '/dashboard/my-results', icon: BarChart3, label: 'My Results' },
        { href: '/dashboard/attendance', icon: CalendarDays, label: 'Attendance' },
        { href: '/dashboard/exams', icon: GraduationCap, label: 'Exams' },
        { href: '/dashboard/settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 h-screen p-4 hidden lg:flex flex-col shadow-sm">

            <div className="flex items-center gap-3 mb-8 px-2">
                <School size={28} className="text-purple-600" />
                <div className="font-semibold text-xl text-gray-800">School</div>
            </div>

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
                {/* The name and role are now dynamic, based on the props */}
                <div className="p-3">
                    <p className="font-semibold text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">{userRole}</p>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setRoleSwitcherOpen(!isRoleSwitcherOpen)}
                        className="w-full flex justify-between items-center text-left px-3 py-2.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100"
                    >
                        <span className="text-sm font-medium">Switch Role</span>
                        <ChevronDown size={16} />
                    </button>
                    {isRoleSwitcherOpen && (
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-white border rounded-lg shadow-xl">
                            <button
                                onClick={() => {
                                    setCurrentUserRole('admin');
                                    setRoleSwitcherOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Switch to Admin
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentUserRole('student');
                                    setRoleSwitcherOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Switch to Student
                            </button>
                        </div>
                    )}
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