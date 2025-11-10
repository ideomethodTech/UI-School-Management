'use client'; // This is CRUCIAL for using hooks like useState

import { useState } from 'react';
import './globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

export default function RootLayout({ children }) {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Start with sidebar closed

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <div className={`layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <Sidebar isOpen={isSidebarOpen} />
          <div className="main-content">
            <Header toggleSidebar={toggleSidebar} />
            <div className="page-content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}