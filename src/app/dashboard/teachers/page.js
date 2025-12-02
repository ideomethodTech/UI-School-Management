"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Eye, Trash2, X, Upload } from "lucide-react";
import { useData } from "../../../contexts/DataContext";

export default function TeachersPage() {
    const { teachers, addTeacher, deleteTeacher } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photoPreview, setPhotoPreview] = useState("");
    const [formState, setFormState] = useState({
        name: "",
        id: "",
        subjects: "",
        classes: "",
        phone: "",
        address: "",
        avatar: "",
    });

    const handleInputChange = (e) =>
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setFormState(prevState => ({ ...prevState, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const openModal = () => {
        setFormState({
            name: "",
            id: "",
            subjects: "",
            classes: "",
            phone: "",
            address: "",
            avatar: "",
        });
        setPhotoPreview("");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPhotoPreview("");
    };

    const handleCreateTeacher = (event) => {
        event.preventDefault();
        if (!formState.name.trim() || !formState.id.trim())
            return alert("Teacher Name and Teacher ID are required.");

        const newTeacher = {
            ...formState,
            subjects: formState.subjects.split(",").map((s) => s.trim()),
            classes: formState.classes.split(",").map((c) => c.trim()),
            avatar:
                formState.avatar || `https://i.pravatar.cc/150?u=${formState.id}`,
        };

        addTeacher(newTeacher);
        closeModal();
    };

    const handleDeleteTeacher = (id) => {
        if (window.confirm("Are you sure?"))
            deleteTeacher(id);
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg m-4 flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800 self-start">
                        All Teachers
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search teachers..."
                                className="rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                            />
                        </div>
                        <button
                            onClick={openModal}
                            className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-gray-50 text-xs text-gray-500 uppercase">
                                <th className="py-3 px-4 font-medium">Info</th>
                                <th className="py-3 px-4 font-medium">Teacher ID</th>
                                <th className="py-3 px-4 font-medium">Subjects</th>
                                <th className="py-3 px-4 font-medium">Classes</th>
                                <th className="py-3 px-4 font-medium">Phone</th>
                                <th className="py-3 px-4 font-medium">Address</th>
                                <th className="py-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {teachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={teacher.avatar}
                                                alt={teacher.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                            <div>
                                                <div className="font-semibold text-gray-800">
                                                    {teacher.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {teacher.subjects?.[0]}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 font-mono">
                                        {teacher.id}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {teacher.subjects?.join(", ")}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {teacher.classes?.join(", ")}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {teacher.phone}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {teacher.address}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/dashboard/teachers/${teacher.id}`}
                                                className="p-2 rounded-md bg-blue-100 hover:bg-blue-200"
                                            >
                                                <Eye size={16} className="text-blue-600" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteTeacher(teacher.id)}
                                                className="p-2 rounded-md bg-red-100 hover:bg-red-200"
                                            >
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Create New Teacher
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTeacher} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teacher Name
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Teacher ID
                                </label>
                                <input
                                    name="id"
                                    type="text"
                                    value={formState.id}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subjects (comma separated)
                                </label>
                                <input
                                    name="subjects"
                                    type="text"
                                    value={formState.subjects}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Classes (comma separated)
                                </label>
                                <input
                                    name="classes"
                                    type="text"
                                    value={formState.classes}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={formState.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    name="address"
                                    type="text"
                                    value={formState.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (optional)</label>
                                <div className="flex items-center gap-4">
                                    {photoPreview && (
                                        <Image src={photoPreview} alt="Preview" width={60} height={60} className="rounded-full object-cover" />
                                    )}
                                    <label className="flex-1 cursor-pointer">
                                        <div className="w-full p-2 border border-dashed border-gray-300 rounded-md hover:border-purple-400 flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600">
                                            <Upload size={18} />
                                            <span className="text-sm">{photoPreview ? 'Change Photo' : 'Choose Photo'}</span>
                                        </div>
                                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}