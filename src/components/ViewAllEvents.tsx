import { motion } from 'motion/react';
import { Search, Plus, FileSpreadsheet, Monitor, QrCode, ChevronRight, Filter, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

const allEvents = [
  { id: 1, name: 'New April 2026 Event', date: '4/10/2026', time: '12:00AM - 6:00AM', location: '360 Hamilton', instructor: 'Manoj Nikam', status: 'Upcoming' },
  { id: 2, name: 'new March 2026 Event', date: '3/25/2026', time: '9:00PM - 10:00PM', location: '420 Lexington Ave', instructor: 'Vasim Patel', status: 'Upcoming' },
  { id: 3, name: 'new March 2026 Event', date: '4/04/2026', time: '6:00AM - 7:00AM', location: 'AP', instructor: 'Mahendra Patel', status: 'Upcoming' },
  { id: 4, name: 'Leadership Training', date: '2/15/2026', time: '10:00AM - 4:00PM', location: 'Conference Room A', instructor: 'Sarah Jenkins', status: 'Completed' },
  { id: 5, name: 'Safety Workshop', date: '1/20/2026', time: '9:00AM - 12:00PM', location: 'Main Hall', instructor: 'David Kim', status: 'Completed' },
];

export const ViewAllEvents = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden"
    >
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search all events..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 border border-slate-200 rounded text-slate-500 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-6 py-2 bg-[#337ab7] text-white rounded-full text-sm font-bold hover:bg-[#286090] transition-colors shadow-lg shadow-blue-100 uppercase">
            <Plus className="w-4 h-4" /> Create Event
          </button>
          <div className="p-2 border border-slate-200 rounded text-slate-500 hover:bg-slate-50 cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Event Name</th>
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Date & Time</th>
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Location</th>
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Instructor</th>
                <th className="px-4 py-2 text-xs font-bold text-slate-700">Status</th>
                <th className="px-4 py-2 text-xs font-bold text-slate-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allEvents.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold text-slate-900">{event.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-slate-900 font-medium">{event.date}</p>
                    <p className="text-[10px] text-slate-500">{event.time}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 font-medium">{event.location}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 font-medium">{event.instructor}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      event.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    )}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
