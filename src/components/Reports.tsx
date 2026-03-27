import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, TrendingUp, Users, Calendar, UserCheck, UserMinus, Search, FileSpreadsheet, ChevronRight, ChevronDown, CalendarDays, CalendarPlus } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, trend }: { label: string, value: string, icon: any, trend?: string }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <p className="text-base font-bold text-slate-500 mb-2">{label}</p>
    <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
  </div>
);

const MOCK_DATA = {
  attended: [
    {
      id: 1,
      event: "New April 2026 Event , 4/10/2026, 12:00AM - 6:00AM, 360 Hamilton",
      users: [
        { name: "Manoj Nikam", dateEnrolled: "04/05/2023 05:06 AM" }
      ]
    },
    {
      id: 2,
      event: "new March 2026 Event , 3/25/2026, 9:00PM - 10:00PM, 420 Lexington Ave",
      users: []
    },
    {
      id: 3,
      event: "*Payscan Data Entry*, 8/07/2020, 1:00AM - 1:00AM, Central Park, NY",
      users: []
    },
    {
      id: 4,
      event: "*Payscan Data Entry*, 8/14/2020, 5:15PM - 8:35PM, 420 Lexington Ave",
      users: []
    },
    {
      id: 5,
      event: "*Payscan Data Entry*, 8/31/2023, 4:00AM - 5:00AM, Admin Office",
      users: []
    },
    {
      id: 6,
      event: "1-to-1 Financial Advising, 12/06/2022, 11:30AM - 12:00AM, HP",
      users: []
    }
  ],
  notAttended: [
    {
      id: 1,
      event: "*Payscan Data Entry*, 8/07/2020, 1:00AM - 1:00AM, Central Park, NY",
      users: [
        { name: "Ashish Prajapati", dateEnrolled: "04/21/2020 09:13 AM" }
      ]
    },
    {
      id: 2,
      event: "401(k) Information Lunch, 7/18/2022, 11:00AM - 11:00PM, Equinox 44th Street",
      users: []
    },
    {
      id: 3,
      event: "401K Luncheon, 5/16/2020, 2:05AM - 3:05AM, 420 Lexington Ave (NYC)",
      users: []
    },
    {
      id: 4,
      event: "Capital Database, 8/16/2022, 10:30AM - 10:45AM, Citi Field",
      users: []
    },
    {
      id: 5,
      event: "New Event demo, 6/29/2022, 10:00AM - 11:00AM, Online",
      users: []
    },
    {
      id: 6,
      event: "Test New Event, 6/29/2022, 6:30AM - 7:00AM, 239 W 49th St",
      users: []
    }
  ]
};

export const Reports = () => {
  const [isNotAttended, setIsNotAttended] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<number[]>([1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleEvent = (id: number) => {
    setExpandedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const currentData = isNotAttended ? MOCK_DATA.notAttended : MOCK_DATA.attended;
  
  const filteredData = currentData.filter(event => 
    event.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.users.some(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedEvents([]); // Optional: collapse all when changing page
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StatCard label="Attended Users" value="1,240" icon={UserCheck} trend="+15%" />
        <StatCard label="Not Attended Users" value="242" icon={UserMinus} trend="-5%" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setIsNotAttended(!isNotAttended);
                  setCurrentPage(1);
                }}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isNotAttended ? 'bg-[#337ab7]' : 'bg-slate-200'}`}
              >
                <span className={`absolute left-2 text-[10px] font-black text-white transition-opacity ${isNotAttended ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                <span className={`absolute right-2 text-[10px] font-black text-slate-400 transition-opacity ${isNotAttended ? 'opacity-0' : 'opacity-100'}`}>OFF</span>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${isNotAttended ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
              <span className="text-sm font-medium text-slate-600">
                {isNotAttended ? 'Not Atteded User Information' : 'Atteded User Information'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded border border-slate-200 transition-colors">
              <FileSpreadsheet className="w-5 h-5" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#337ab7] w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[50%]">EMPLOYEE NAME</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-[50%]">DATE ENROLLED</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((event) => (
                <React.Fragment key={event.id}>
                  <tr 
                    onClick={() => toggleEvent(event.id)}
                    className="bg-[#337ab7] text-white cursor-pointer hover:bg-[#286090] transition-colors border-b border-white/10"
                  >
                    <td colSpan={2} className="p-0">
                      <div className="px-4 py-3 text-sm font-medium flex items-center w-full">
                        <div className="flex items-center gap-3">
                          {expandedEvents.includes(event.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          <span>{event.event}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedEvents.includes(event.id) && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <td colSpan={2} className="p-0">
                          <table className="w-full">
                            <tbody>
                              {event.users.length > 0 ? (
                                event.users.map((user, idx) => (
                                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="px-10 py-4 text-sm text-slate-700 w-[50%]">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700 w-[50%]">{user.dateEnrolled}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr className="border-b border-slate-100">
                                  <td colSpan={2} className="px-10 py-4 text-sm text-slate-400 italic">No information available</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-slate-500 italic">
                    No results found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 0 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${page === currentPage ? 'bg-[#337ab7] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
