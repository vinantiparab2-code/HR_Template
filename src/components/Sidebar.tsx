import React from 'react';
import { 
  Calendar, 
  Users, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  PlusCircle,
  Clock,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

const SidebarItem = ({ icon: Icon, label, active, onClick, variant = 'default' }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full gap-3 px-4 py-2.5 text-sm font-medium transition-all rounded-lg group",
      active 
        ? "bg-indigo-50 text-indigo-600" 
        : variant === 'danger' 
          ? "text-rose-500 hover:bg-rose-50" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-indigo-600" : variant === 'danger' ? "text-rose-500" : "text-slate-400 group-hover:text-slate-900")} />
    {label}
  </button>
);

export const Sidebar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-slate-100 flex flex-col p-4 z-20">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl text-slate-900 tracking-tight">HR Sync</span>
      </div>

      <nav className="flex-1 space-y-1">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activeTab === 'dashboard'} 
          onClick={() => onTabChange('dashboard')}
        />
        <SidebarItem 
          icon={Calendar} 
          label="Calendar" 
          active={activeTab === 'calendar'} 
          onClick={() => onTabChange('calendar')}
        />
        <SidebarItem 
          icon={PlusCircle} 
          label="Events" 
          active={activeTab === 'events'} 
          onClick={() => onTabChange('events')}
        />
        <SidebarItem 
          icon={Users} 
          label="Attendees" 
          active={activeTab === 'attendees'} 
          onClick={() => onTabChange('attendees')}
        />
      </nav>

      <div className="pt-4 mt-4 border-t border-slate-50 space-y-1">
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          active={activeTab === 'settings'} 
          onClick={() => onTabChange('settings')} 
        />
        <SidebarItem 
          icon={LogOut} 
          label="Logout" 
          variant="danger"
        />
      </div>
    </aside>
  );
};
