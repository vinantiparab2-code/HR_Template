import { ChevronDown, ChevronLeft } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export const Header = ({ title, onBack }: HeaderProps) => {
  const formatTitle = (text: string) => {
    return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <header className="h-16 bg-white px-8 flex items-center justify-between border-b border-slate-200 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-[#337ab7]">{formatTitle(title)}</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-[#337ab7] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
            MN
          </div>
          <p className="text-xs font-bold text-[#337ab7] group-hover:text-[#286090] transition-colors">Manoj Nikam</p>
          <ChevronDown className="w-3 h-3 text-[#337ab7] group-hover:text-[#286090] transition-colors" />
        </div>
      </div>
    </header>
  );
};
