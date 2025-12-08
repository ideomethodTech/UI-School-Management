// src/app/dashboard/Search/SearchableTable.js
"use client";

import { Plus } from 'lucide-react';
import SearchBar from './SearchBar';
import useSearch from './useSearch';

/**
 * Reusable searchable table wrapper component
 * @param {string} title - Section title
 * @param {Array} data - Data to display and search
 * @param {Array} searchKeys - Keys to search in the data
 * @param {string} searchPlaceholder - Placeholder for search input
 * @param {function} onAdd - Callback for add button (optional)
 * @param {React.ReactNode} children - Table content to render (receives filteredData as prop)
 */
export default function SearchableTable({
    title,
    data,
    searchKeys,
    searchPlaceholder = "Search...",
    onAdd,
    children
}) {
    const { searchTerm, setSearchTerm, filteredData } = useSearch(data, searchKeys);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                </div>
                <div className="flex items-center gap-3">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder={searchPlaceholder}
                    />
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md transition-colors"
                            aria-label="Add new item"
                        >
                            <Plus size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                {typeof children === 'function' ? children(filteredData) : children}
            </div>
        </div>
    );
}
