"use client";

import { useState } from "react";
import TeachersTable from "@/components/TeachersTable";
import TeacherModal from "@/components/TeacherModal";
import { Search, SlidersHorizontal, ArrowDownUp, Plus } from "lucide-react";

const TeachersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-white h-full p-4 rounded-md m-4 mt-0 flex-1">
            {/* TOP SECTION */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 py-2 bg-white">
                        <Search width={14} height={14} className="text-gray-500" />
                        <input type="text" placeholder="Search..." className="w-[200px] p-0 bg-transparent outline-none text-gray-600" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200 hover:bg-yellow-300">
                            <SlidersHorizontal width={16} height={16} className="text-gray-600" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200 hover:bg-yellow-300">
                            <ArrowDownUp width={16} height={16} className="text-gray-600" />
                        </button>
                        {/* Open Modal Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200 hover:bg-yellow-300"
                        >
                            <Plus width={16} height={16} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="mt-4">
                <TeachersTable />
            </div>

            {/* MODAL SECTION */}
            <TeacherModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default TeachersPage;