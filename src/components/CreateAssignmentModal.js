import { X, Calendar } from "lucide-react";

const CreateAssignmentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Create New Assignment</h2>
                        <p className="text-sm text-gray-500">Add a new assignment for your class</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><X size={24} /></button>
                </div>
                {/* Modal Body - Form */}
                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                        <input type="text" placeholder="e.g., Chapter 5: Practice Problems" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea placeholder="Assignment details and instructions" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input type="text" defaultValue="Mathematics" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <input type="text" defaultValue="10-A" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input type="text" placeholder="dd-mm-yyyy" className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                            <Calendar className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                            <input type="number" defaultValue="100" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </form>
                {/* Modal Footer */}
                <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border">Cancel</button>
                    <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm">Create Assignment</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignmentModal;
