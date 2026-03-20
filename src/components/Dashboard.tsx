import { Users, Calendar, Clock, CheckCircle2, MoreHorizontal, TrendingUp, User } from 'lucide-react';
import { motion } from 'motion/react';

const StatCard = ({ label, value, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
    <div className="flex items-start justify-between mb-6">
      <div className="p-2.5 bg-indigo-50 rounded-xl">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
          <span className="text-[10px] font-bold">+{trend}%</span>
          <TrendingUp className="w-3 h-3" />
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</h3>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const UpcomingEvent = ({ date, month, title, time, location, attendees }: any) => (
  <div className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-all rounded-2xl border border-transparent hover:border-slate-100 group">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 border border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{month}</span>
        <span className="text-xl font-bold text-slate-900 leading-none">{date}</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-base">{title}</h4>
        <div className="flex items-center gap-4 mt-1.5">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {time}
          </span>
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <span className="w-1 h-1 bg-slate-300 rounded-full" /> {location}
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex -space-x-3">
        {attendees.map((a: string, i: number) => (
          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden ring-1 ring-slate-100">
            <img src={`https://picsum.photos/seed/${a}/32/32`} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        ))}
        {attendees.length > 3 && (
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 ring-1 ring-slate-100">
            +{attendees.length - 3}
          </div>
        )}
      </div>
      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const ActivityItem = ({ title, description, time }: any) => (
  <div className="flex gap-4 p-4 hover:bg-slate-50/50 rounded-2xl transition-all group">
    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center shrink-0 border border-indigo-100">
      <User className="w-5 h-5 text-indigo-600" />
    </div>
    <div className="space-y-1">
      <h5 className="text-sm font-bold text-slate-900 leading-tight">{title}</h5>
      <p className="text-xs text-slate-400 font-medium leading-relaxed">{description}</p>
      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider pt-1">{time}</p>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h2>
        <p className="text-slate-400 font-medium">Welcome back, HR Manager. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Events" value="24" icon={Calendar} trend={12} />
        <StatCard label="Total Attendees" value="142" icon={Users} trend={12} />
        <StatCard label="Pending Invites" value="12" icon={Clock} trend={12} />
        <StatCard label="Completed" value="86%" icon={CheckCircle2} trend={12} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Upcoming Events</h3>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">View all</button>
          </div>
          <div className="px-3 pb-6 space-y-1">
            <UpcomingEvent 
              month="MAR" date="20" 
              title="Senior Developer Interview" 
              time="10:00 AM" location="Meeting Room A" 
              attendees={['a', 'b', 'c']} 
            />
            <UpcomingEvent 
              month="MAR" date="21" 
              title="New Hire Onboarding" 
              time="02:00 PM" location="Training Center" 
              attendees={['d', 'e', 'f', 'g']} 
            />
            <UpcomingEvent 
              month="MAR" date="23" 
              title="Team Building Workshop" 
              time="09:00 AM" location="Offsite - Grand Hall" 
              attendees={['h', 'i']} 
            />
            <UpcomingEvent 
              month="MAR" date="18" 
              title="Compliance Training" 
              time="11:00 AM" location="Virtual Zoom" 
              attendees={['j', 'k', 'l', 'm']} 
            />
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Feed</h3>
            <div className="space-y-4">
              <ActivityItem 
                title="New attendee confirmed" 
                description="Sarah Jenkins confirmed for 'Onboarding Session'" 
                time="2 HOURS AGO" 
              />
              <ActivityItem 
                title="New attendee confirmed" 
                description="Sarah Jenkins confirmed for 'Onboarding Session'" 
                time="2 HOURS AGO" 
              />
              <ActivityItem 
                title="New attendee confirmed" 
                description="Sarah Jenkins confirmed for 'Onboarding Session'" 
                time="2 HOURS AGO" 
              />
              <ActivityItem 
                title="New attendee confirmed" 
                description="Sarah Jenkins confirmed for 'Onboarding Session'" 
                time="2 HOURS AGO" 
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
