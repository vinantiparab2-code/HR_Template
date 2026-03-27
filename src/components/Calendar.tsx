import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  Search,
  Clock,
  MapPin,
  Users,
  X,
  Calendar
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
import { AddEvent } from './AddEvent';

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

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
    { 
      id: '1',
      date: new Date(2026, 2, 24), 
      title: 'Interview: John Doe', 
      type: 'interview',
      time: '10:00 AM',
      location: 'Meeting Room A',
      instructor: 'Manoj Nikam',
      description: 'Technical interview for Senior Developer position.'
    },
    { 
      id: '2',
      date: new Date(2026, 2, 24), 
      title: 'Team Meeting', 
      type: 'meeting',
      time: '02:00 PM',
      location: 'Conference Room B',
      instructor: 'HR Team',
      description: 'Weekly sync to discuss project progress and blockers.'
    },
    { 
      id: '3',
      date: new Date(2026, 2, 26), 
      title: 'Training Session', 
      type: 'training',
      time: '09:00 AM',
      location: 'Training Center',
      instructor: 'External Trainer',
      description: 'Advanced React patterns and performance optimization.'
    },
    { 
      id: '4',
      date: new Date(2026, 2, 28), 
      title: 'Happy Hour', 
      type: 'social',
      time: '05:00 PM',
      location: 'Lounge Area',
      instructor: 'Social Committee',
      description: 'Relax and unwind with the team after a productive week.'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[calc(100vh-12rem)]"
    >
      <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#337ab7]">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-1 bg-slate-100 rounded p-1">
            <button onClick={prevMonth} className="p-1 hover:bg-white hover:shadow-sm rounded text-slate-600 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentMonth(new Date())} className="px-3 py-1 text-xs font-bold hover:bg-white hover:shadow-sm rounded text-slate-600 transition-all">
              Today
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-white hover:shadow-sm rounded text-slate-600 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded">
            <button 
              onClick={() => setView('month')}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded transition-all",
                view === 'month' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Month
            </button>
            <button 
              onClick={() => setView('week')}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded transition-all",
                view === 'week' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Week
            </button>
            <button 
              onClick={() => setView('day')}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded transition-all",
                view === 'day' ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-800"
              )}
            >
              Day
            </button>
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#337ab7] text-white rounded text-sm font-bold hover:bg-[#286090] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create Event
          </button>
        </div>
      </div>

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <div className="sticky top-0 z-10 bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-2xl font-medium text-[#337ab7]">Create Event</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              <AddEvent onCancel={() => setIsCreateModalOpen(false)} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            <div className="bg-[#337ab7] px-8 py-6 flex items-center justify-between text-white">
              <h3 className="text-xl font-bold">Event Details</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block",
                  selectedEvent.type === 'interview' ? "bg-blue-100 text-blue-700" :
                  selectedEvent.type === 'meeting' ? "bg-slate-100 text-slate-700" :
                  selectedEvent.type === 'training' ? "bg-indigo-100 text-indigo-700" :
                  "bg-slate-100 text-slate-700"
                )}>
                  {selectedEvent.type}
                </span>
                <h4 className="text-2xl font-bold text-slate-900">{selectedEvent.title}</h4>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date & Time</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{format(selectedEvent.date, 'MMMM d, yyyy')} at {selectedEvent.time}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instructor</p>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{selectedEvent.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="px-8 py-2.5 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all shadow-lg shadow-blue-100 uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-7 bg-[#337ab7]">
        {weekDays.map(day => (
          <div key={day} className="py-2 text-center text-xs font-bold text-white uppercase tracking-wider border-r border-white/10 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {view === 'month' ? (
          <div className="grid grid-cols-7 h-full">
            {calendarDays.map((day, idx) => {
              const dayEvents = events.filter(e => isSameDay(e.date, day));
              const isToday = isSameDay(day, new Date());
              const isCurrentMonth = isSameMonth(day, monthStart);

              return (
                <div 
                  key={idx} 
                  className={cn(
                    "min-h-[120px] p-2 border-r border-b border-slate-100 transition-colors cursor-pointer hover:bg-slate-50/50",
                    !isCurrentMonth && "bg-slate-50/50 text-slate-300",
                    isToday && "bg-blue-50/30"
                  )}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="flex justify-end items-center mb-1">
                    <span className={cn(
                      "text-sm font-bold w-7 h-7 flex items-center justify-center rounded",
                      isToday ? "bg-[#337ab7] text-white" : "text-slate-700"
                    )}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.map((event, eIdx) => (
                      <div 
                        key={eIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold truncate border shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]",
                          event.type === 'interview' ? "bg-blue-50 text-blue-700 border-blue-100" :
                          event.type === 'meeting' ? "bg-slate-100 text-slate-700 border-slate-200" :
                          event.type === 'training' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
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
        ) : view === 'week' ? (
          <div className="grid grid-cols-7 h-full">
            {calendarDays.slice(0, 7).map((day, idx) => {
              const dayEvents = events.filter(e => isSameDay(e.date, day));
              const isToday = isSameDay(day, new Date());
              
              return (
                <div key={idx} className={cn("min-h-[400px] p-4 border-r border-slate-100", isToday && "bg-blue-50/30")}>
                  <div className="text-center mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{format(day, 'EEE')}</p>
                    <span className={cn(
                      "text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full mx-auto",
                      isToday ? "bg-[#337ab7] text-white shadow-lg shadow-blue-200" : "text-slate-700"
                    )}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {dayEvents.map((event, eIdx) => (
                      <div 
                        key={eIdx}
                        onClick={() => setSelectedEvent(event)}
                        className={cn(
                          "p-3 rounded-xl text-xs font-bold border shadow-sm space-y-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]",
                          event.type === 'interview' ? "bg-blue-50 text-blue-700 border-blue-100" :
                          event.type === 'meeting' ? "bg-slate-100 text-slate-700 border-slate-200" :
                          event.type === 'training' ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                          "bg-slate-50 text-slate-700 border-slate-100"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 opacity-50" />
                          <span>{event.time}</span>
                        </div>
                        <p className="leading-tight">{event.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-sm font-bold text-slate-400 uppercase mb-1">{format(selectedDate, 'EEEE')}</p>
                <span className="text-4xl font-bold text-[#337ab7]">{format(selectedDate, 'd')}</span>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{format(selectedDate, 'MMMM yyyy')}</h3>
                <p className="text-slate-500">You have {events.filter(e => isSameDay(e.date, selectedDate)).length} events scheduled for today.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {events.filter(e => isSameDay(e.date, selectedDate)).map((event, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedEvent(event)}
                  className="flex gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group cursor-pointer"
                >
                  <div className="w-24 text-sm font-bold text-slate-400 pt-1">{event.time}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        event.type === 'interview' ? "bg-blue-100 text-blue-700" :
                        event.type === 'meeting' ? "bg-slate-200 text-slate-700" :
                        "bg-indigo-100 text-indigo-700"
                      )}>
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {event.instructor}</span>
                    </div>
                  </div>
                </div>
              ))}
              {events.filter(e => isSameDay(e.date, selectedDate)).length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No events scheduled for this day.</p>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="mt-4 text-[#337ab7] font-bold hover:underline"
                  >
                    + Create an event
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
