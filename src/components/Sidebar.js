// src/components/Sidebar.js
"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  GraduationCap,
  Users,
  UserRound,
  BookOpen,
  Monitor,
  Pencil,
  ClipboardList,
  FileText,
  BarChart3,
  Calendar,
  MessageSquare,
  PieChart,
  School,
  User,
  Settings
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname() || '/dashboard/home'

  const items = [
    { href: '/dashboard/home', icon: Home, label: 'Home' },
    { href: '/dashboard/teachers', icon: GraduationCap, label: 'Teachers' },
    { href: '/dashboard/students', icon: Users, label: 'Students' },
    { href: '/dashboard/parents', icon: UserRound, label: 'Parents' },
    { href: '/dashboard/subjects', icon: BookOpen, label: 'Subjects' },
    { href: '/dashboard/classes', icon: Monitor, label: 'Classes' },
    { href: '/dashboard/lessons', icon: Pencil, label: 'Lessons' },
    { href: '/dashboard/exams', icon: ClipboardList, label: 'Exams' },
    { href: '/dashboard/assignments', icon: FileText, label: 'Assignments' },
    { href: '/dashboard/results', icon: BarChart3, label: 'Results' },
    { href: '/dashboard/attendance', icon: PieChart, label: 'Attendance' },
    { href: '/dashboard/events', icon: Calendar, label: 'Events' },
    { href: '/dashboard/messages', icon: MessageSquare, 'label': 'Messages' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-screen p-4 hidden lg:flex flex-col shadow-sm">
      <div className="flex items-center gap-3 mb-8 px-2">
        <School size={28} className="text-purple-600" />
        <div className="font-semibold text-xl text-gray-800">School</div>
      </div>

      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 mb-3">MENU</div>

      <nav className="flex-1 overflow-auto space-y-1">
        {items.map((it) => {
          const isActive = pathname === it.href || pathname.startsWith(it.href + '/')
          return (
            <Link 
              key={it.href} 
              href={it.href} 
              className={
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors ' +
                (isActive
                  ? 'bg-purple-50 text-purple-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
              }
            >
              <it.icon size={18}
                className={isActive ? 'text-purple-600' : 'text-gray-500'} />
              <span className="text-sm">{it.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 text-xs text-gray-400 px-2">© 2025 School</div>
    </aside>
  )
}