import { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  MoreHorizontal,
  TrendingUp,
  Search,
  FileSpreadsheet,
  Check,
  Eye,
  Edit2,
  Trash2,
  Plus,
  QrCode,
  Monitor,
  UserMinus,
  ChevronDown,
  ArrowUp,
  X,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const StatCard = ({ label, value, icon: Icon, trend, color }: { label: string, value: string, icon: any, trend?: string, color: string }) => (
  <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={cn("p-2 rounded-lg", color)}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-[11px] font-bold">
          {trend}
        </div>
      )}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-500 mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
    </div>
  </div>
);

const EventItem = ({ date, month, title, time, location, avatars }: { date: string, month: string, title: string, time: string, location: string, avatars: string[] }) => (
  <div className="flex items-center justify-between py-4 group cursor-pointer">
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
        <span className="text-[10px] font-bold text-slate-400 uppercase">{month}</span>
        <span className="text-xl font-bold text-slate-900">{date}</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{title}</h4>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {time}</span>
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {location}</span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        {avatars.map((url, i) => (
          <img 
            key={i} 
            src={url} 
            alt="avatar" 
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
          +1
        </div>
      </div>
      <button className="p-2 text-slate-300 hover:text-slate-600">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const ActivityItem = ({ title, subtitle, time }: { title: string, subtitle: string, time: string }) => (
  <div className="flex gap-4 py-4">
    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
      <Users className="w-5 h-5" />
    </div>
    <div>
      <h5 className="text-sm font-bold text-slate-900 mb-0.5">{title}</h5>
      <p className="text-xs text-slate-500 mb-1">{subtitle}</p>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{time}</span>
    </div>
  </div>
);

const TabButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm font-bold transition-all rounded-lg",
      active ? "bg-[#337ab7] text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-50"
    )}
  >
    {label}
  </button>
);

export const Dashboard = ({ onAddEvent, onManageEnrollment }: { onAddEvent: () => void, onManageEnrollment: () => void }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative space-y-8"
    >
      {/* Drop Confirmation Modal */}
      {isDropModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-2xl font-medium text-[#337ab7]">Drop Confirmation</h3>
              <button 
                onClick={() => setIsDropModalOpen(false)}
                className="p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 border-b border-slate-100">
              <p className="text-slate-600">Are you sure you want to drop this scheduled event?</p>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <button 
                onClick={() => setIsDropModalOpen(false)}
                className="px-8 py-2.5 border border-[#337ab7] text-[#337ab7] rounded-full font-bold text-sm hover:bg-blue-50 transition-all uppercase"
              >
                CANCEL
              </button>
              <button 
                onClick={() => setIsDropModalOpen(false)}
                className="px-8 py-2.5 bg-[#337ab7] text-white rounded-full font-bold text-sm hover:bg-[#286090] transition-all uppercase shadow-lg shadow-blue-100"
              >
                SUBMIT
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full relative"
          >
            <button 
              onClick={() => setIsQRModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-[#337ab7] text-white rounded-xl hover:bg-[#286090] transition-all shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#337ab7] mb-6">GenerateQRCode</h3>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://ais-dev-b7omds67dwfpzr3hpnasgu-744065281948.asia-southeast1.run.app" 
                  alt="QR Code"
                  className="w-full aspect-square object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-slate-500">Scan this code to access the event details quickly.</p>
            </div>
          </motion.div>
        </div>
      )}

      <div>
        <p className="text-slate-500">Welcome back, HR Manager. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Today's Events" 
          value="24" 
          icon={Calendar} 
          trend="+12%" 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          label="Upcoming Events" 
          value="142" 
          icon={Users} 
          trend="+12%" 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          label="My Events" 
          value="12" 
          icon={Clock} 
          trend="+12%" 
          color="bg-blue-50 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
              <TabButton label="Today's Events" active={activeTab === 'today'} onClick={() => setActiveTab('today')} />
              <TabButton label="Upcoming Events" active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')} />
              <TabButton label="My Events" active={activeTab === 'my'} onClick={() => setActiveTab('my')} />
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onAddEvent}
                className="flex items-center gap-2 px-4 py-2 bg-[#337ab7] text-white rounded-xl text-sm font-bold hover:bg-[#286090] transition-all shadow-lg shadow-blue-200"
              >
                <Plus className="w-4 h-4" /> Add Event
              </button>
              <button 
                onClick={onManageEnrollment}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
              >
                <Users className="w-4 h-4" /> Manage Enrollment
              </button>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mb-4">
            {(activeTab === 'upcoming' || activeTab === 'my') && (
              <>
                <button 
                  onClick={() => setIsQRModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#337ab7] text-white rounded-lg text-sm font-bold hover:bg-[#286090] transition-all"
                >
                  <QrCode className="w-4 h-4" /> QR Code
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all">
                  <Monitor className="w-4 h-4" /> Virtual Events
                </button>
              </>
            )}
            <div className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder={activeTab === 'today' ? "Search Today's Events" : "Search Upcoming Events"}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          {activeTab === 'today' ? (
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <div className="max-h-[370px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Employee Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(10)].map((_, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">Manoj Nikam</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'upcoming' ? (
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Event Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        Start Date <ArrowUp className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Location / Room</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    className="bg-blue-50/50 text-blue-700 cursor-pointer hover:bg-blue-100/50 transition-colors"
                  >
                    <td colSpan={3} className="px-6 py-2.5 text-sm font-bold">
                      <div className="flex items-center gap-2">
                        {isAccordionOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />} 
                        new March 2026 Event
                      </div>
                    </td>
                  </tr>
                  {isAccordionOpen && (
                    <>
                      <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-900">new March 2026 Event</td>
                        <td className="px-6 py-4 text-sm text-slate-900">3/25/2026, 9:00 PM</td>
                        <td className="px-6 py-4 text-sm text-slate-900">420 Lexington Ave / 19D</td>
                      </tr>
                      <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-900">new March 2026 Event</td>
                        <td className="px-6 py-4 text-sm text-slate-900">4/4/2026, 6:00 AM</td>
                        <td className="px-6 py-4 text-sm text-slate-900">AP / 2131</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'my' ? (
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Event Name</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        Start Date <ArrowUp className="w-3 h-3" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900">new March 2026 Event</td>
                    <td className="px-6 py-4 text-sm text-slate-900">3/25/2026, 9:00 PM</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900">new March 2026 Event</td>
                    <td className="px-6 py-4 text-sm text-slate-900">4/4/2026, 6:00 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              <EventItem 
                month="MAR" date="20"
                title="Senior Developer Interview"
                time="10:00 AM"
                location="Meeting Room A"
                avatars={['https://picsum.photos/seed/1/100', 'https://picsum.photos/seed/2/100', 'https://picsum.photos/seed/3/100']}
              />
              <EventItem 
                month="MAR" date="21"
                title="New Hire Onboarding"
                time="02:00 PM"
                location="Training Center"
                avatars={['https://picsum.photos/seed/4/100', 'https://picsum.photos/seed/5/100', 'https://picsum.photos/seed/6/100']}
              />
              <EventItem 
                month="MAR" date="23"
                title="Team Building Workshop"
                time="09:00 AM"
                location="Offsite - Grand Hall"
                avatars={['https://picsum.photos/seed/7/100']}
              />
              <EventItem 
                month="MAR" date="18"
                title="Compliance Training"
                time="11:00 AM"
                location="Virtual Zoom"
                avatars={['https://picsum.photos/seed/8/100', 'https://picsum.photos/seed/9/100']}
              />
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#337ab7] mb-8">Activity Feed</h3>
          <div className="space-y-2">
            <ActivityItem 
              title="New attendee confirmed"
              subtitle="Sarah Jenkins confirmed for 'Onboarding Session'"
              time="2 hours ago"
            />
            <ActivityItem 
              title="New attendee confirmed"
              subtitle="Sarah Jenkins confirmed for 'Onboarding Session'"
              time="2 hours ago"
            />
            <ActivityItem 
              title="New attendee confirmed"
              subtitle="Sarah Jenkins confirmed for 'Onboarding Session'"
              time="2 hours ago"
            />
            <ActivityItem 
              title="New attendee confirmed"
              subtitle="Sarah Jenkins confirmed for 'Onboarding Session'"
              time="2 hours ago"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
