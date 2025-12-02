"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar,
    Mail,
    Phone,
    Droplets,
    // New Icons added for the stat cards
    CalendarCheck,
    Building2,
    BookOpen,
    Users
} from "lucide-react";

// Import existing components
import BigCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";
import { teachersData } from "../data";

const SingleTeacherPage = ({ params }) => {
    const { id } = use(params);

    // Find the specific teacher by ID
    const teacher = teachersData.find(t => t.id === id);

    // If teacher not found, show error message
    if (!teacher) {
        return (
            <div className="flex-1 p-4 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Teacher Not Found</h1>
                    <p className="text-gray-600 mt-2">The teacher with ID "{id}" does not exist.</p>
                    <Link href="/dashboard/teachers" className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Back to Teachers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">

            {/* LEFT COLUMN */}
            <div className="w-full xl:w-2/3">

                {/* TOP SECTION: Teacher Info Card + Small Stats */}
                <div className="flex flex-col lg:flex-row gap-4">

                    {/* TEACHER INFO CARD (Blue) */}
                    <div className="bg-purple-100 py-6 px-4 rounded-md flex-1 flex gap-4">
                        <div className="w-1/3">
                            <Image
                                src={teacher.avatar}
                                alt={teacher.name}
                                width={144}
                                height={144}
                                className="w-36 h-36 rounded-full object-cover"
                            />
                        </div>
                        <div className="w-2/3 flex flex-col justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-semibold">{teacher.name}</h1>
                                {/* Edit Button */}
                                <Link href={`/dashboard/teachers/${id}/edit`} className="bg-white p-2 rounded-full hover:bg-blue-50">
                                    <div className="w-4 h-4 text-gray-500">✎</div>
                                </Link>
                            </div>
                            <p className="text-sm text-gray-500">
                                {teacher.subjects.join(" & ")} Teacher
                            </p>
                            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <BookOpen size={14} />
                                    <span>{teacher.subjects.join(", ")}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Users size={14} />
                                    <span>Classes: {teacher.classes.join(", ")}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Phone size={14} />
                                    <span>{teacher.phone}</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                                    <Mail size={14} />
                                    <span>{teacher.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SMALL STAT CARDS (FIXED) */}
                    {/* Switched to Grid for better layout and replaced Images with Icons */}
                    <div className="flex-1 grid grid-cols-2 gap-4 mt-4 lg:mt-0">

                        {/* Card 1: Attendance */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <CalendarCheck size={24} className="text-sky-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-500">Attendance</span>
                            </div>
                        </div>

                        {/* Card 2: Subjects */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <BookOpen size={24} className="text-purple-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher.subjects.length}</h1>
                                <span className="text-sm text-gray-500">Subjects</span>
                            </div>
                        </div>

                        {/* Card 3: Classes */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <Users size={24} className="text-pink-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">{teacher.classes.length}</h1>
                                <span className="text-sm text-gray-500">Classes</span>
                            </div>
                        </div>

                        {/* Card 4: Lessons */}
                        <div className="bg-white p-4 rounded-md flex gap-3 w-full">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <Building2 size={24} className="text-yellow-500" />
                            </div>
                            <div className="">
                                <h1 className="text-xl font-semibold">6</h1>
                                <span className="text-sm text-gray-500">Lessons</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BOTTOM SECTION: SCHEDULE */}
                <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
                    <h1 className="text-xl font-semibold">Teacher&apos;s Schedule</h1>
                    <BigCalendar />
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">

                {/* SHORTCUTS */}
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Shortcuts</h1>
                    <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">

                        {/* 1. Teacher's Classes */}
                        <Link
                            className="p-3 rounded-md bg-sky-50 hover:bg-sky-100"
                            href={`/dashboard/teachers/${id}/classes`}
                        >
                            Teacher&apos;s Classes
                        </Link>

                        {/* 2. Teacher's Students */}
                        <Link
                            className="p-3 rounded-md bg-purple-50 hover:bg-purple-100"
                            href={`/dashboard/teachers/${id}/students`}
                        >
                            Teacher&apos;s Students
                        </Link>

                        {/* 3. Teacher's Lessons */}
                        <Link
                            className="p-3 rounded-md bg-yellow-50 hover:bg-yellow-100"
                            href={`/dashboard/teachers/${id}/lessons`}
                        >
                            Teacher&apos;s Lessons
                        </Link>

                        {/* 4. Teacher's Exams */}
                        <Link
                            className="p-3 rounded-md bg-pink-50 hover:bg-pink-100"
                            href={`/dashboard/teachers/${id}/exams`}
                        >
                            Teacher&apos;s Exams
                        </Link>

                        {/* 5. Teacher's Assignments */}
                        <Link
                            className="p-3 rounded-md bg-teal-50 hover:bg-teal-100"
                            href={`/dashboard/teachers/${id}/assignments`}
                        >
                            Teacher&apos;s Assignments
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

export default SingleTeacherPage;