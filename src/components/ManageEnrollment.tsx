import { ChevronDown, ChevronRight, Search, FileSpreadsheet, ChevronLeft, X, CornerDownRight, UserMinus, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const CalendarAt = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <text x="12" y="18" fontSize="9" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="bold">@</text>
  </svg>
);

const CalendarUserPlus = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <circle cx="11" cy="15" r="2" />
    <path d="M7 19c0-1.5 1.5-2 4-2s4 .5 4 2" />
    <path d="M16 16h3" />
    <path d="M17.5 14.5v3" />
  </svg>
);

interface Enrollment {
  id: string;
  employeeName: string;
  dateEnrolled: string;
  status: string;
}

interface EventGroup {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  enrollments: Enrollment[];
}

const pastEvents: EventGroup[] = [
  {
    id: 'p1',
    title: 'New April 2026 Event',
    date: '4/10/2026',
    time: '12:00AM - 6:00AM',
    location: '360 Hamilton',
    enrollments: []
  },
  {
    id: 'p2',
    title: 'new March 2026 Event',
    date: '3/25/2026',
    time: '9:00PM - 10:00PM',
    location: '420 Lexington Ave',
    enrollments: [
      { id: 'e1', employeeName: 'Manoj Nikam', dateEnrolled: '03/17/2026 01:13 PM', status: 'Enrolled' },
      { id: 'e2', employeeName: 'Vasim Patel', dateEnrolled: '03/17/2026 01:14 PM', status: 'Enrolled' },
      { id: 'e3', employeeName: 'Mahendra Patel', dateEnrolled: '03/18/2026 06:05 AM', status: 'Enrolled' },
      { id: 'e4', employeeName: 'Sarfaraz Syed', dateEnrolled: '03/18/2026 06:05 AM', status: 'Enrolled' },
    ]
  },
  {
    id: 'p3',
    title: 'new March 2026 Event',
    date: '4/04/2026',
    time: '6:00AM - 7:00AM',
    location: 'AP',
    enrollments: []
  }
];

const currentEvents: EventGroup[] = [
  {
    id: 'c1',
    title: '1-to-1 Financial Advising',
    date: '12/06/2022',
    time: '1:00PM - 2:00PM',
    location: '420 Lexington Ave',
    enrollments: [
      { id: 'ce1', employeeName: 'Cathy Ibarra', dateEnrolled: '12/05/2022 01:40 PM', status: 'Enrolled' }
    ]
  },
  { id: 'c2', title: '1-to-1 Financial Advising', date: '12/26/2022', time: '3:00PM - 4:00PM', location: 'AP', enrollments: [] },
  { id: 'c3', title: '1-to-1 Financial Advising', date: '3/20/2023', time: '2:00PM - 3:00PM', location: 'Cafeteria1.0', enrollments: [] },
  { id: 'c4', title: '1-to-1 Financial Advising', date: '5/05/2025', time: '4:00PM - 5:00PM', location: 'Admin Office', enrollments: [] },
  { id: 'c5', title: '1-to-1 Financial Advising', date: '5/13/2025', time: '2:00PM - 3:00PM', location: '420 Lexington Ave', enrollments: [] },
  { id: 'c6', title: '1-to-1 Financial Advising', date: '5/25/2023', time: '10:00PM - 11:00PM', location: '420 Lexington Ave', enrollments: [] },
  { id: 'c7', title: '2013 Yardi 1099', date: '11/16/2024', time: '1:05AM - 4:15AM', location: '53 West 23rd St', enrollments: [] },
  { id: 'c8', title: '2013 Yardi 1099', date: '12/08/2022', time: '11:00AM - 2:00PM', location: '420 Lexington Ave', enrollments: [] },
  { id: 'c9', title: '2014 Yardi Budget & Forecasting - Westchester', date: '3/21/2023', time: '3:00PM - 4:00PM', location: 'Admin Office', enrollments: [] },
  { id: 'c10', title: '2022 - Graphics new tools', date: '10/28/2022', time: '8:00PM - 9:00PM', location: 'Central Park, NY', enrollments: [] },
];

export const ManageEnrollment = ({ onBack }: { onBack: () => void }) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['p2', 'c1']);
  const [showPastEvents, setShowPastEvents] = useState(true);
  const [emailModalEvent, setEmailModalEvent] = useState<EventGroup | null>(null);
  const [enrollModalEvent, setEnrollModalEvent] = useState<EventGroup | null>(null);
  const [dropModalEnrollment, setDropModalEnrollment] = useState<Enrollment | null>(null);
  const [attendedModalEnrollment, setAttendedModalEnrollment] = useState<Enrollment | null>(null);

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const activeEvents = showPastEvents ? pastEvents : currentEvents;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-50"
    >
      <div className="p-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowPastEvents(!showPastEvents)}
                  className={`w-14 h-7 rounded-full relative flex items-center transition-colors ${showPastEvents ? 'bg-[#337ab7]' : 'bg-slate-300'}`}
                >
                  <span className={`text-[9px] font-bold text-white absolute transition-all ${showPastEvents ? 'left-2' : 'right-2'}`}>
                    {showPastEvents ? 'ON' : 'OFF'}
                  </span>
                  <div className={`w-5 h-5 bg-white rounded-full absolute transition-all ${showPastEvents ? 'right-1' : 'left-1'}`} />
                </button>
                <span className="text-sm text-slate-600">
                  {showPastEvents ? 'Show Past Events' : 'Show Current Events'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                <FileSpreadsheet className="w-5 h-5 text-slate-600" />
              </button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#337ab7] w-64"
                />
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3">
            <div className="col-span-4">Employee Name</div>
            <div className="col-span-2">Date Enrolled</div>
            <div className="col-span-2">Attended</div>
            {showPastEvents && <div className="col-span-2">Enrollment Status</div>}
            <div className={showPastEvents ? "col-span-2 text-right" : "col-span-4 text-right"}>Action</div>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-slate-100">
            {activeEvents.map((event) => (
              <div key={event.id} className="group">
                {/* Group Header */}
                <div 
                  onClick={() => toggleGroup(event.id)}
                  className="flex items-center justify-between px-6 py-3 bg-[#337ab7] text-white cursor-pointer hover:bg-[#286090] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {expandedGroups.includes(event.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {event.title} , {event.date}, {event.time}, {event.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      {showPastEvents && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEmailModalEvent(event);
                          }}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                        >
                          <CalendarAt className="w-7 h-7" />
                        </button>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnrollModalEvent(event);
                        }}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                      >
                        <CalendarUserPlus className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Group Content */}
                <AnimatePresence>
                  {expandedGroups.includes(event.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {event.enrollments.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                          {event.enrollments.map((enrollment) => (
                            <div key={enrollment.id} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                              <div className="col-span-4 text-sm text-slate-700">{enrollment.employeeName}</div>
                              <div className="col-span-2 text-sm text-slate-500">{enrollment.dateEnrolled}</div>
                              <div className="col-span-2"></div>
                              {showPastEvents && (
                                <div className="col-span-2">
                                  <span className="text-xs font-medium text-green-600">{enrollment.status}</span>
                                </div>
                              )}
                              <div className={showPastEvents ? "col-span-2 flex justify-end gap-6" : "col-span-4 flex justify-end gap-6"}>
                                <div className="relative group">
                                  <button 
                                    onClick={() => setDropModalEnrollment(enrollment)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all duration-200"
                                  >
                                    <UserMinus className="w-5 h-5" />
                                  </button>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#337ab7] text-white text-[9px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-sm">
                                    Drop
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#337ab7]" />
                                  </div>
                                </div>
                                {showPastEvents && (
                                  <div className="relative group">
                                    <button 
                                      onClick={() => setAttendedModalEnrollment(enrollment)}
                                      className="p-2 hover:bg-green-50 rounded-lg text-slate-400 hover:text-green-600 transition-all duration-200"
                                    >
                                      <UserCheck className="w-5 h-5" />
                                    </button>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#337ab7] text-white text-[9px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-sm">
                                      Attended
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#337ab7]" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-6 py-8 text-center text-sm text-slate-400 italic">
                          No enrollments found for this event.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {!showPastEvents && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              {[1, 2, 3, 4, 5, 6].map(page => (
                <button 
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors ${page === 1 ? 'bg-[#337ab7] text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email Attendees Modal */}
      <AnimatePresence>
        {emailModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded shadow-2xl max-w-4xl w-full overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="text-xl font-medium text-[#337ab7]">Manage Enrollment- Email Attendess</h3>
                <button 
                  onClick={() => setEmailModalEvent(null)}
                  className="p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Subject</label>
                  <p className="text-sm text-slate-600">{emailModalEvent.title}, {emailModalEvent.date}, {emailModalEvent.time}, {emailModalEvent.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-1">Content</label>
                  <textarea 
                    className="w-full h-48 p-3 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#337ab7]"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setEmailModalEvent(null)}
                    className="px-10 py-3 border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-all text-sm font-bold uppercase"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={() => {
                      // Logic to "send" email could go here
                      setEmailModalEvent(null);
                    }}
                    className="px-10 py-3 bg-[#337ab7] text-white rounded-full hover:bg-[#286090] transition-all text-sm font-bold uppercase shadow-md"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enroll Employee Modal */}
      <AnimatePresence>
        {enrollModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="flex items-center justify-between p-6">
                <h3 className="text-2xl font-bold text-[#337ab7]">Enroll Employee</h3>
                <button 
                  onClick={() => setEnrollModalEvent(null)}
                  className="p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 pb-6 space-y-5">
                <div className="border-t border-slate-100 pt-5">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Course Event</label>
                  <p className="text-sm text-slate-600">{enrollModalEvent.title}, {enrollModalEvent.date}, {enrollModalEvent.time}, {enrollModalEvent.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Available Seats</label>
                  <p className="text-sm text-slate-600">2</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Employees</label>
                  <div className="relative">
                    <select className="w-full p-2.5 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#337ab7] appearance-none bg-white pr-10">
                      <option>Abigail Goldstein</option>
                      <option>Manoj Nikam</option>
                      <option>Vasim Patel</option>
                      <option>Mahendra Patel</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setEnrollModalEvent(null)}
                    className="px-10 py-3 border border-slate-200 text-slate-700 rounded-full font-bold text-sm hover:bg-blue-50 transition-all uppercase"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={() => {
                      // Logic to enroll could go here
                      setEnrollModalEvent(null);
                    }}
                    className="px-10 py-3 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all uppercase shadow-md"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Drop Confirmation Modal */}
      <AnimatePresence>
        {dropModalEnrollment && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-2xl font-medium text-slate-700">Drop Confirmation</h3>
                <button 
                  onClick={() => setDropModalEnrollment(null)}
                  className="p-2 bg-[#337ab7] text-white rounded-lg hover:bg-[#286090] transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <p className="text-base text-slate-700 mb-8">Are you sure you want to drop this user</p>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setDropModalEnrollment(null)}
                    className="px-10 py-3 border border-slate-200 text-slate-700 rounded-full font-bold text-sm hover:bg-slate-50 transition-all uppercase"
                  >
                    NO
                  </button>
                  <button 
                    onClick={() => {
                      // Logic to drop could go here
                      setDropModalEnrollment(null);
                    }}
                    className="px-10 py-3 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all uppercase shadow-md"
                  >
                    YES
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Attended Confirmation Modal */}
      <AnimatePresence>
        {attendedModalEnrollment && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="text-2xl font-medium text-slate-700">Attended Confirmation</h3>
                <button 
                  onClick={() => setAttendedModalEnrollment(null)}
                  className="p-2 bg-[#337ab7] text-white rounded-lg hover:bg-[#286090] transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <p className="text-base text-slate-700 mb-8">Are you sure you want to mark this user as attended</p>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setAttendedModalEnrollment(null)}
                    className="px-10 py-3 border border-slate-200 text-slate-700 rounded-full font-bold text-sm hover:bg-slate-50 transition-all uppercase"
                  >
                    NO
                  </button>
                  <button 
                    onClick={() => {
                      // Logic to mark as attended could go here
                      setAttendedModalEnrollment(null);
                    }}
                    className="px-10 py-3 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all uppercase shadow-md"
                  >
                    YES
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
