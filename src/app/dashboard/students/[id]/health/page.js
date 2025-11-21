"use client";
import Link from "next/link";

const healthData = {
    bloodGroup: 'O+',
    allergies: 'Peanuts',
    emergencyContact: 'Mrs. Moran (Mother) - 555-0199',
    records: [
        { date: '2025-01-10', type: 'Checkup', note: 'Annual physical. All clear.' },
        { date: '2024-11-05', type: 'Visit', note: 'Reported headache. Rested in infirmary.' },
    ]
};

const StudentHealthPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Health Records</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>
       
       {/* Summary Card */}
       <div className="bg-emerald-50 p-4 rounded-md border border-emerald-200 mb-6">
            <h2 className="font-bold text-emerald-800 mb-2">Medical Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div><span className="font-medium">Blood Group:</span> {healthData.bloodGroup}</div>
                <div><span className="font-medium">Allergies:</span> <span className="text-red-500">{healthData.allergies}</span></div>
                <div><span className="font-medium">Emergency:</span> {healthData.emergencyContact}</div>
            </div>
       </div>

       <h3 className="font-semibold text-gray-700 mb-4">Visit Log</h3>
       <div className="space-y-2">
          {healthData.records.map((rec, idx) => (
              <div key={idx} className="flex gap-4 p-3 border-b last:border-0 hover:bg-gray-50">
                  <span className="text-sm font-bold text-gray-500 w-24">{rec.date}</span>
                  <div className="flex-1">
                      <span className="text-sm font-bold block text-gray-800">{rec.type}</span>
                      <span className="text-sm text-gray-600">{rec.note}</span>
                  </div>
              </div>
          ))}
       </div>
    </div>
  );
};
export default StudentHealthPage;