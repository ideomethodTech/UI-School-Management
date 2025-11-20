// In: src/app/students/[id]/page.js
'use client';

import React from 'react';
import Link from 'next/link';
import { studentsData } from '../data.js'; // Ensure this path is correct

export default function StudentDetailPage({ params }) {
    const student = studentsData.find(s => String(s.id) === params.id);

    if (!student) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">Student Not Found</h1>
                <p>No student exists with the ID: {params.id}</p>
                <Link href="/students" className="text-blue-500 hover:underline mt-4 inline-block">
                    &larr; Back to All Students
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
            <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">{student.name}</h2>
                <p className="text-gray-600">ID: {student.id}</p>
                <p className="text-gray-600">Grade: {student.grade}</p>
                <p className="text-gray-600">Phone: {student.phone}</p>
                <p className="text-gray-600">Address: {student.address}</p>
            </div>
            <Link href="/students" className="text-blue-500 hover:underline mt-6 inline-block">
                &larr; Back to All Students
            </Link>
        </div>
    );
}