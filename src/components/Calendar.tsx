import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  Search,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mock events for the wireframe
  const events = [
    { date: new Date(2026, 2, 24), title: 'Interview: John Doe', type: 'interview' },
    { date: new Date(2026, 2, 24), title: 'Team Meeting', type: 'meeting' },
    { date: new Date(2026, 2, 26), title: 'Training Session', type: 'training' },
    { date: new Date(2026, 2, 28), title: 'Happy Hour', type: 'social' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-12rem)]"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
            <button onClick={prevMonth} className="p-1 hover:bg-slate-100 rounded text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentMonth(new Date())} className="px-2 py-1 text-xs font-medium hover:bg-slate-100 rounded text-slate-600">
              Today
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-slate-100 rounded text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-3 py-1 text-xs font-medium bg-white shadow-sm rounded-md text-slate-900">Month</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">Week</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-900">Day</button>
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            <Plus className="w-4 h-4" /> Create Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 overflow-auto">
        {calendarDays.map((day, idx) => {
          const dayEvents = events.filter(e => isSameDay(e.date, day));
          return (
            <div 
              key={idx} 
              className={cn(
                "min-h-[120px] p-2 border-r border-b border-slate-100 transition-colors cursor-pointer hover:bg-slate-50/50",
                !isSameMonth(day, monthStart) && "bg-slate-50 text-slate-300",
                isSameDay(day, new Date()) && "bg-blue-50/30"
              )}
              onClick={() => setSelectedDate(day)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={cn(
                  "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                  isSameDay(day, new Date()) ? "bg-slate-900 text-white" : "text-slate-700"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="space-y-1">
                {dayEvents.map((event, eIdx) => (
                  <div 
                    key={eIdx}
                    className={cn(
                      "px-2 py-1 rounded text-[10px] font-medium truncate border",
                      event.type === 'interview' ? "bg-blue-50 text-blue-700 border-blue-100" :
                      event.type === 'meeting' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      event.type === 'training' ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-slate-50 text-slate-700 border-slate-100"
                    )}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
