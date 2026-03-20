import { Search, Filter, MoreVertical, UserPlus, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search attendees..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
            <UserPlus className="w-4 h-4" /> Add Attendee
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Attendee</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attendees.map((person) => (
              <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                      {person.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{person.name}</p>
                      <p className="text-xs text-slate-500">{person.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{person.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    person.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                    person.status === 'Busy' ? 'bg-amber-100 text-amber-700' : 
                    'bg-slate-100 text-slate-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      person.status === 'Available' ? 'bg-emerald-500' : 
                      person.status === 'Busy' ? 'bg-amber-500' : 
                      'bg-slate-400'
                    }`} />
                    {person.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing 6 of 156 attendees</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-900 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded shadow-sm">1</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900">2</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-900">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
