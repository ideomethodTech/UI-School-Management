"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    Mail,
    Phone,
    Droplets,
    GraduationCap,
    FileText,
    TrendingUp,
    Users,
    Trophy,
    HeartPulse,
    BookOpen,
    ClipboardList,
    CalendarCheck
} from "lucide-react";

// Import existing components
import BigCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import { useData } from "@/contexts/DataContext";

const SingleStudentPage = ({ params }) => {
    const { id } = use(params);
    const { students } = useData();

    // Find the specific student by ID
    const student = students.find(s => s.id === id);

    // If student not found, show error message
    if (!student) {
        return (
            <div className="flex-1 p-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Student Not Found</h1>
                    <p className="text-gray-600 mt-2">The student with ID "{id}" does not exist.</p>
                    <Link href="/dashboard/students" className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Back to Students
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">

            {/* LEFT COLUMN (2/3 Width) */}
            <div className="w-full xl:w-2/3">

                {/* TOP SECTION: Student Info Card + Small Stats */}
                <div className="flex flex-col lg:flex-row gap-4">

                    {/* STUDENT INFO CARD */}
                    <div className="bg-purple-100 py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image
                                src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
                                alt={student.name}
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-semibold">{student.name}</h1>
                                <Link href={`/dashboard/students/${id}/edit`} className="bg-white p-2 rounded-full hover:bg-purple-50 transition-colors">
                                    <div className="w-4 h-4 text-gray-500">✎</div>
                                </Link>
                            </div>
                            <p className="text-sm text-gray-500">
                                Student ID: {student.id}
                            </p>

                            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Droplets size={14} />
                                    <span>A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <GraduationCap size={14} />
                                    <span>Grade {student.grade}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>Joined Jan 2025</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Phone size={14} />
                                    <span>{student.phone || 'N/A'}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Mail size={14} />
                                    <span>{student.address || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMALL STAT CARDS */}
                    <div className="flex-1 grid grid-cols-2 gap-4 mt-4 lg:mt-0">

                        {/* Card 1: Attendance */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <CalendarCheck size={24} className="text-sky-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">94%</h1>
                                <span className="text-sm text-gray-500">Attendance</span>
                            </div>
                        </div>

                        {/* Card 2: Grade */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <GraduationCap size={24} className="text-purple-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">{student.grade}</h1>
                                <span className="text-sm text-gray-500">Grade</span>
                            </div>
                        </div>

                        {/* Card 3: Lessons */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <BookOpen size={24} className="text-pink-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">18</h1>
                                <span className="text-sm text-gray-500">Lessons</span>
                            </div>
                        </div>

                        {/* Card 4: Assignments */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <FileText size={24} className="text-yellow-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-500">Assignments</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: SCHEDULE */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1 className="text-xl font-semibold">Student&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>

            {/* RIGHT COLUMN (1/3 Width) */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">

                {/* SHORTCUTS */}
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">

                        {/* 1. Results */}
                        <Link className="p-3 rounded-md bg-sky-50 hover:bg-sky-100 flex items-center gap-2" href={`/dashboard/students/${id}/results`}>
                            <ClipboardList size={16} /> Student&apos;s Results
                        </Link>

                        {/* 2. Lessons */}
                        <Link className="p-3 rounded-md bg-purple-50 hover:bg-purple-100 flex items-center gap-2" href={`/dashboard/students/${id}/lessons`}>
                            <BookOpen size={16} /> Student&apos;s Lessons
                        </Link>

                        {/* 3. Assignments */}
                        <Link className="p-3 rounded-md bg-yellow-50 hover:bg-yellow-100 flex items-center gap-2" href={`/dashboard/students/${id}/assignments`}>
                            <FileText size={16} /> Student&apos;s Assignments
                        </Link>

                        {/* 4. Meetings */}
                        <Link className="p-3 rounded-md bg-orange-50 hover:bg-orange-100 flex items-center gap-2" href={`/dashboard/students/${id}/meetings`}>
                            <Users size={16} /> Parent-Teacher Meetings
                        </Link>

                        {/* 5. Progress */}
                        <Link className="p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 flex items-center gap-2" href={`/dashboard/students/${id}/progress`}>
                            <TrendingUp size={16} /> Progress Report
                        </Link>

                        {/* 6. Activities */}
                        <Link className="p-3 rounded-md bg-pink-50 hover:bg-pink-100 flex items-center gap-2" href={`/dashboard/students/${id}/activities`}>
                            <Trophy size={16} /> Extracurricular Activities
                        </Link>

                        {/* 7. Health */}
                        <Link className="p-3 rounded-md bg-emerald-50 hover:bg-emerald-100 flex items-center gap-2" href={`/dashboard/students/${id}/health`}>
                            <HeartPulse size={16} /> Health Records
                        </Link>

                    </div>
                </div>

                {/* PERFORMANCE CHART */}
                <div className="">
                    <Performance />
                </div>

                {/* ANNOUNCEMENTS */}
                <div className="">
                    <Announcements />
                </div>
            </div>
        </div>
    );
};

export default SingleStudentPage;