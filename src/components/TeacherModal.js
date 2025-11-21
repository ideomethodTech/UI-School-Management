"use client";
import { X, CloudUpload } from "lucide-react";

const TeacherModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h1 className="text-xl font-semibold mb-8">Create a new teacher</h1>

        <form className="flex flex-col gap-8">
          
          {/* Authentication Info */}
          <div>
            <span className="text-xs text-gray-400 font-medium block mb-4">Authentication Information</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Teacher Number</label>
                <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Email (optional)</label>
                <input type="email" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Password</label>
                <input type="password" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <span className="text-xs text-gray-400 font-medium block mb-4">Personal Information</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">First Name</label>
                <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Last Name</label>
                <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Phone</label>
                <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Address</label>
                <input type="text" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Blood Type</label>
                <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full text-gray-500">
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>O-</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500">Birthday</label>
                <input type="date" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full text-gray-500" />
              </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500">Sex</label>
                    <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full text-gray-500">
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                
                {/* Upload Area */}
                <div className="flex flex-col gap-2 justify-center items-center pt-6">
                    <label className="text-xs text-gray-500 flex flex-col items-center cursor-pointer">
                        <CloudUpload className="text-gray-400 mb-2" />
                        <span>Upload a photo</span>
                        <input type="file" className="hidden"/>
                    </label>
                </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500">Subjects</label>
                    <select multiple className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full text-gray-500 h-24">
                        <option>Mathematics</option>
                        <option>Science</option>
                        <option>English</option>
                        <option>History</option>
                        <option>Geography</option>
                        <option>Art</option>
                        <option>Physical Education</option>
                        <option>Hindi</option>
                        
                    </select>
                </div>
             </div>
          </div>

          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;