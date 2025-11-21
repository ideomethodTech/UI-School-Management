"use client";

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
  CalendarCheck // Added for Attendance icon
} from "lucide-react";

// Import existing components
import BigCalendar from "@/components/EventCalendar"; 
import Announcements from "@/components/Announcements";
import Performance from "@/components/Performance";

const SingleStudentPage = ({ params }) => {
  
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      
      {/* LEFT COLUMN (2/3 Width) */}
      <div className="w-full xl:w-2/3">
        
        {/* TOP SECTION: Student Info Card + Small Stats */}
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* STUDENT INFO CARD */}
          <div className="bg-blue-100 py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Student Photo"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Cameron Moran</h1>
                <Link href={`/dashboard/students/${params.id}/edit`} className="bg-white p-2 rounded-full hover:bg-blue-50 transition-colors">
                   <div className="w-4 h-4 text-gray-500">✎</div> 
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Hardworking student with a keen interest in Mathematics and Science.
              </p>
              
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Droplets size={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <GraduationCap size={14} />
                  <span>Grade 6A</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Joined Jan 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Mail size={14} />
                  <span>cameron@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Phone size={14} />
                  <span>+1 234 567 890</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL STAT CARDS */}
{/* Changed from flex-wrap to grid for better spacing control */}
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
      <h1 className="text-xl font-semibold">6th</h1>
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
        <FileText size={24} className="text-yellow-500"/>
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
            <Link className="p-3 rounded-md bg-sky-50 hover:bg-sky-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/results`}>
              <ClipboardList size={16} /> Student&apos;s Results
            </Link>

            {/* 2. Lessons */}
            <Link className="p-3 rounded-md bg-purple-50 hover:bg-purple-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/lessons`}>
              <BookOpen size={16} /> Student&apos;s Lessons
            </Link>

            {/* 3. Assignments */}
            <Link className="p-3 rounded-md bg-yellow-50 hover:bg-yellow-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/assignments`}>
              <FileText size={16} /> Student&apos;s Assignments
            </Link>

            {/* 4. Meetings */}
            <Link className="p-3 rounded-md bg-orange-50 hover:bg-orange-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/meetings`}>
              <Users size={16} /> Parent-Teacher Meetings
            </Link>

            {/* 5. Progress */}
            <Link className="p-3 rounded-md bg-indigo-50 hover:bg-indigo-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/progress`}>
              <TrendingUp size={16} /> Progress Report
            </Link>

            {/* 6. Activities */}
            <Link className="p-3 rounded-md bg-pink-50 hover:bg-pink-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/activities`}>
              <Trophy size={16} /> Extracurricular Activities
            </Link>

            {/* 7. Health */}
            <Link className="p-3 rounded-md bg-emerald-50 hover:bg-emerald-100 flex items-center gap-2" href={`/dashboard/students/${params.id}/health`}>
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