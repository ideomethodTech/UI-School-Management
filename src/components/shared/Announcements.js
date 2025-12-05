// src/components/Announcements.js
import { Volume2 } from 'lucide-react';

export default function Announcements() {
  const announcements = [
    { id: 1, title: 'Parent-Teacher Meeting', date: 'Oct 26', description: 'Please check your schedule for meeting slots.' },
    { id: 2, title: 'School Trip to Museum', date: 'Nov 15', description: 'Permission slips are due by Nov 1.' },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Announcements</h3>
      <div className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Volume2 size={20} className="text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">{announcement.title}</p>
                <p className="text-sm text-gray-500">{announcement.description}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{announcement.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}