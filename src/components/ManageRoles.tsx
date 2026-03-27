import { motion, AnimatePresence } from 'motion/react';
import { Search, UserPlus, Trash2, ChevronDown, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface RoleGroup {
  id: string;
  name: string;
  users: User[];
}

const initialRoleGroups: RoleGroup[] = [
  {
    id: 'admin',
    name: 'Admin',
    users: [
      { id: 1, name: 'Bill Hand' },
      { id: 2, name: 'Ashish Prajapati' },
      { id: 3, name: 'Manish Rane' },
      { id: 4, name: 'Mara McBreen' },
      { id: 5, name: 'Catherine Ibarra' },
      { id: 6, name: 'Titu Turner' },
      { id: 7, name: 'Manoj Nikam' },
      { id: 8, name: 'Thu Thu Naing' },
      { id: 9, name: 'Manoj K. Gharat' },
      { id: 10, name: 'Vinanti Parab' },
      { id: 11, name: 'Sharon Llivichuzca' },
      { id: 12, name: 'Indy Kaur' },
      { id: 13, name: 'Manoj Kumar Gharat' },
      { id: 14, name: 'James Velez' },
      { id: 15, name: 'Marillyn Franco' },
      { id: 16, name: 'Steven Tarca' },
      { id: 17, name: 'Naija Couch' },
      { id: 18, name: 'Mahendra Patel' },
    ]
  },
  {
    id: 'power',
    name: 'Power',
    users: [
      { id: 19, name: 'John Doe' },
      { id: 20, name: 'Jane Smith' },
    ]
  }
];

export const ManageRoles = () => {
  const [expandedRoles, setExpandedRoles] = useState<string[]>(['admin']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRole = (roleId: string) => {
    setExpandedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId) 
        : [...prev, roleId]
    );
  };

  const filteredRoleGroups = initialRoleGroups.map(group => ({
    ...group,
    users: group.users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(group => group.users.length > 0);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#003366]">Manage Role</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#337ab7] rounded-full flex items-center justify-center text-white text-xs font-bold">MN</div>
            <span className="text-sm font-medium text-slate-700">Manoj Nikam</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden p-8">
          <div className="flex justify-end mb-4 gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded border border-slate-200 transition-colors">
              <FileSpreadsheet className="w-5 h-5" />
            </button>
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-[#337ab7]"
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider px-4 py-3">
              <div className="col-span-10">Employee Name</div>
              <div className="col-span-2">Action</div>
            </div>

            {/* Role Groups */}
            {filteredRoleGroups.map((group) => (
              <div key={group.id} className="border-b border-slate-200 last:border-0">
                <button 
                  onClick={() => toggleRole(group.id)}
                  className="w-full grid grid-cols-12 items-center bg-[#337ab7] text-white px-4 py-2 hover:bg-[#286090] transition-colors"
                >
                  <div className="col-span-10 flex items-center gap-2">
                    {expandedRoles.includes(group.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <span className="text-sm font-bold">{group.name}</span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <UserPlus className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedRoles.includes(group.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {group.users.map((user, index) => (
                        <div 
                          key={user.id} 
                          className={`grid grid-cols-12 items-center px-4 py-2 text-sm text-slate-600 border-b border-slate-100 last:border-0 hover:bg-blue-50/30 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                        >
                          <div className="col-span-10 pl-4">{user.name}</div>
                          <div className="col-span-2">
                            <button className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 gap-1">
            <button className="w-8 h-8 flex items-center justify-center bg-[#337ab7] text-white rounded text-xs font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>
    </div>
  );
};
