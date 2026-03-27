import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CalendarView } from './components/Calendar';
import { AttendeeList } from './components/AttendeeList';
import { AddEvent } from './components/AddEvent';
import { ManageEnrollment } from './components/ManageEnrollment';
import { Reports } from './components/Reports';
import { ManageRoles } from './components/ManageRoles';
import { ViewAllEvents } from './components/ViewAllEvents';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onAddEvent={() => setActiveTab('add-event')} 
            onManageEnrollment={() => setActiveTab('manage-enrollment')} 
          />
        );
      case 'events-calendar':
      case 'calendar':
        return <CalendarView />;
      case 'attendees':
        return <AttendeeList />;
      case 'add-event':
        return <AddEvent onCancel={() => setActiveTab('dashboard')} />;
      case 'manage-enrollment':
        return <ManageEnrollment onBack={() => setActiveTab('dashboard')} />;
      case 'reports':
        return <Reports />;
      case 'manage-roles':
        return <ManageRoles />;
      case 'view-all-events':
        return <ViewAllEvents />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-300">
            <p className="text-sm font-medium">This section ({activeTab}) is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header 
          title={activeTab} 
          onBack={['add-event', 'manage-enrollment'].includes(activeTab) ? () => setActiveTab('dashboard') : undefined}
        />
        
        <div className="p-6 flex-1">
          <div className="max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
