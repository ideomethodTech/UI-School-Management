// src/components/UpcomingAssignments.js
import { CheckCircle } from 'lucide-react';

export default function UpcomingAssignments() {
  const assignments = [
    { id: 1, title: 'Math Homework', dueDate: 'Due Fri', description: 'Differential Equations' },
    { id: 2, title: 'Science Project', dueDate: 'Due Wed', description: 'Renewable Energy Sources' },
    { id: 3, title: 'English Essay', dueDate: 'Due Mon', description: 'Literary Analysis of "1984"' },
  ];

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Assignments</h3>
      <div className="space-y-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">{assignment.title}</p>
                <p className="text-sm text-gray-500">{assignment.description}</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              {assignment.dueDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}