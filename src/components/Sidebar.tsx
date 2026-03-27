import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart3, 
  UserCog, 
  ChevronDown,
  ChevronRight,
  Shield,
  ClipboardList,
  Eye,
  LayoutGrid
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon: any;
  hasSubmenu?: boolean;
  isExpanded?: boolean;
  hideArrow?: boolean;
}

const SidebarItem = ({ label, active, onClick, icon: Icon, hasSubmenu, isExpanded, hideArrow }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-4 py-3 text-sm font-medium transition-all text-left gap-3 mb-1 rounded-lg",
      active ? "bg-blue-50" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-[#337ab7]" : "text-slate-400")} />
    <span className={cn("flex-1 whitespace-nowrap", active ? "text-[#337ab7]" : "text-slate-500")}>{label}</span>
    {hasSubmenu && !hideArrow && (
      isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
    )}
  </button>
);

const SubSidebarItem = ({ label, active, onClick }: { label: string, active?: boolean, onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full pl-12 pr-4 py-2 text-xs font-medium transition-all text-left mb-1 rounded-lg",
      active ? "bg-blue-50/50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    )}
  >
    <span className={cn("flex-1", active ? "text-[#337ab7]" : "text-slate-500")}>{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  const [isAdminExpanded, setIsAdminExpanded] = useState(true);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white flex flex-col z-20 border-r border-slate-100">
      {/* Header / Logo Section */}
      <div className="h-28 flex items-center px-6 bg-[#004a8d] mb-6">
        <div className="flex items-center gap-4">
          {/* SL Green Logo Icon */}
          <div className="w-10 h-14 bg-white relative flex items-center justify-center">
            <div className="absolute top-[15%] left-[15%] w-[35%] h-[25%] bg-[#004a8d]"></div>
            <div className="absolute bottom-[15%] right-[15%] w-[35%] h-[50%] bg-[#004a8d]"></div>
          </div>
          
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight leading-none">SL GREEN</span>
            <div className="h-[0.5px] bg-white/60 w-full my-1.5"></div>
            <span className="text-[10px] font-bold text-white tracking-[0.15em] leading-none uppercase">Realty Corp.</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 overflow-y-auto">
        <SidebarItem 
          label="Dashboard" 
          icon={LayoutGrid}
          active={activeTab === 'dashboard'} 
          onClick={() => onTabChange('dashboard')}
        />
        
        <SidebarItem 
          label="Events Calendar" 
          icon={Calendar}
          active={activeTab === 'calendar'} 
          onClick={() => onTabChange('calendar')}
        />

        <SidebarItem 
          label="Reports" 
          icon={BarChart3}
          active={activeTab === 'reports'} 
          onClick={() => onTabChange('reports')}
        />

        <div>
          <SidebarItem 
            label="Admin Management" 
            icon={UserCog}
            hasSubmenu
            isExpanded={isAdminExpanded}
            onClick={() => setIsAdminExpanded(!isAdminExpanded)}
            active={activeTab === 'manage-roles' || activeTab === 'manage-enrollment'}
            hideArrow
          />
          {isAdminExpanded && (
            <div className="mt-1">
              <SubSidebarItem 
                label="Manage Roles"
                active={activeTab === 'manage-roles'}
                onClick={() => onTabChange('manage-roles')}
              />
              <SubSidebarItem 
                label="Manage Current Enrollment"
                active={activeTab === 'manage-enrollment'}
                onClick={() => onTabChange('manage-enrollment')}
              />
            </div>
          )}
        </div>

        <SidebarItem 
          label="View All Events" 
          icon={Eye}
          active={activeTab === 'view-all-events'} 
          onClick={() => onTabChange('view-all-events')}
        />
      </nav>
    </aside>
  );
};
