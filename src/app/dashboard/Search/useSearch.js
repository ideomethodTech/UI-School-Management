// src/app/dashboard/Search/useSearch.js
"use client";

import { useState, useMemo } from 'react';

/**
 * Custom hook for search functionality
 * @param {Array} data - Array of data to search through
 * @param {Array} searchKeys - Array of keys to search in each data object
 * @returns {Object} - { searchTerm, setSearchTerm, filteredData }
 */
export default function useSearch(data, searchKeys = []) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data;

        const search = searchTerm.toLowerCase();

        return data.filter(item => {
            return searchKeys.some(key => {
                const value = getNestedValue(item, key);

                // Handle different data types
                if (Array.isArray(value)) {
                    return value.some(v =>
                        String(v).toLowerCase().includes(search)
                    );
                }

                return String(value || '').toLowerCase().includes(search);
            });
        });
    }, [data, searchTerm, searchKeys]);

    return { searchTerm, setSearchTerm, filteredData };
}

/**
 * Helper function to get nested values from objects
 * @param {Object} obj - Object to get value from
 * @param {string} path - Path to the value (e.g., 'user.name')
 */
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
}
