import { X, Plus, ChevronLeft, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export const AddEvent = ({ onCancel }: { onCancel: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [trainingType, setTrainingType] = useState('');

  const handleAddTrainingType = () => {
    if (!trainingType.trim()) {
      setIsErrorModalOpen(true);
      return;
    }
    // Logic to add training type would go here
    setIsModalOpen(false);
    setTrainingType('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Form Error Modal */}
      <AnimatePresence>
        {isErrorModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-2xl font-medium text-[#337ab7]">Form Error</h3>
                <button 
                  onClick={() => setIsErrorModalOpen(false)}
                  className="p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 space-y-2">
                <p className="text-red-600">There are errors on the form. Please correct the following error(s):</p>
                <p className="text-red-600">1. Please Enter Training Type</p>
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setIsErrorModalOpen(false)}
                  className="px-8 py-2.5 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all uppercase shadow-lg shadow-blue-100"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Training Type Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-2xl font-medium text-[#337ab7]">Add Training Type</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Training Type:</label>
                  <input 
                    type="text" 
                    value={trainingType}
                    onChange={(e) => setTrainingType(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-2.5 border border-[#337ab7] text-[#337ab7] rounded-full font-bold text-sm hover:bg-blue-50 transition-all uppercase"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleAddTrainingType}
                  className="px-8 py-2.5 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all uppercase shadow-lg shadow-blue-100"
                >
                  SUBMIT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="w-full">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Type with Plus Icon */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Type</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none">
                    <option>Select Event Type...</option>
                    <option>Training Session</option>
                    <option>Interview</option>
                    <option>Workshop</option>
                    <option>Onboarding</option>
                    <option>Compliance</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Plus className="w-4 h-4 rotate-45" />
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="p-3 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-lg shadow-blue-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Created By */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Created By</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value="Manoj Nikam" 
                  readOnly
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-100 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Event Name */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Event Name</label>
              <input 
                type="text" 
                placeholder="Type Event Name..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
              <textarea 
                rows={4}
                placeholder="Provide details about the event goals and requirements..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              />
            </div>

            {/* Instructor */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instructor</label>
              <input 
                type="text" 
                placeholder="Type Instructor Name..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button 
            onClick={onCancel}
            className="px-10 py-3 bg-white border border-[#337ab7] text-[#337ab7] rounded-full font-bold text-sm hover:bg-blue-50 transition-all uppercase"
          >
            CANCEL
          </button>
          <button className="px-10 py-3 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all shadow-lg shadow-blue-100 uppercase">
            SUBMIT
          </button>
        </div>
      </div>
    </motion.div>
  );
};
