import { Search, Bell } from 'lucide-react';

export const Header = ({ title }: { title: string }) => {
  return (
    <header className="h-20 bg-white px-8 flex items-center justify-between border-b border-slate-50 sticky top-0 z-10">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">Arun Kumar</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HR Director</p>
          </div>
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            AK
          </div>
        </div>
      </div>
    </header>
  );
};
