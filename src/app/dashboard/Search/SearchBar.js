// src/app/dashboard/Search/SearchBar.js
"use client";

import { Search } from 'lucide-react';

/**
 * Reusable search bar component for dashboard sections
 * @param {string} value - Current search term
 * @param {function} onChange - Callback function when search term changes
 * @param {string} placeholder - Placeholder text for the search input
 * @param {string} className - Additional CSS classes
 */
export default function SearchBar({ value, onChange, placeholder = "Search...", className = "" }) {
    return (
        <div className={`relative ${className}`}>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 w-full"
            />
        </div>
    );
}
