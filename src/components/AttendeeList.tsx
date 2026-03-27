import { Search, Filter, MoreVertical, UserPlus, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const attendees = [
  { id: 1, name: 'James Wilson', role: 'Senior Developer', email: 'james.w@company.com', status: 'Available', avatar: 'JW' },
  { id: 2, name: 'Elena Rodriguez', role: 'Product Designer', email: 'elena.r@company.com', status: 'Busy', avatar: 'ER' },
  { id: 3, name: 'Marcus Chen', role: 'Marketing Lead', email: 'marcus.c@company.com', status: 'Available', avatar: 'MC' },
  { id: 4, name: 'Sarah Jenkins', role: 'HR Manager', email: 'sarah.j@company.com', status: 'Available', avatar: 'SJ' },
  { id: 5, name: 'David Kim', role: 'QA Engineer', email: 'david.k@company.com', status: 'Out of Office', avatar: 'DK' },
  { id: 6, name: 'Olivia Taylor', role: 'Content Strategist', email: 'olivia.t@company.com', status: 'Available', avatar: 'OT' },
];

export const AttendeeList = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden"
    >
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search attendees..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#337ab7] text-white rounded text-sm font-bold hover:bg-[#286090] transition-colors shadow-sm">
            <UserPlus className="w-4 h-4" /> Add Attendee
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Attendee</th>
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendees.map((person) => (
                <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#337ab7] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        {person.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#337ab7]">{person.name}</p>
                        <p className="text-[10px] text-slate-500">{person.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 font-medium">{person.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-bold">Showing 6 of 156 attendees</p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-900 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 text-xs font-bold text-white bg-[#337ab7] rounded shadow-sm">1</button>
              <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900">2</button>
              <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900">Next</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
