
import React from 'react';

interface SidebarProps {
  activeTab: 'dashboard' | 'lesson' | 'tutor';
  setActiveTab: (tab: 'dashboard' | 'lesson' | 'tutor') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'dashboard', icon: 'fa-gauge-high', label: 'Roadmap' },
    { id: 'lesson', icon: 'fa-book-open', label: 'Today\'s Lesson' },
    { id: 'tutor', icon: 'fa-robot', label: 'AI Tutor' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-900 text-slate-400 flex flex-col transition-all">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>
        <span className="hidden md:block font-bold text-white text-lg tracking-tight">LevelUp ENG</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="hidden md:block bg-slate-800 p-4 rounded-xl">
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Next Milestone</p>
          <p className="text-sm text-white font-medium mb-3">Intermediate (B1) Exam</p>
          <button className="w-full bg-slate-700 hover:bg-slate-600 text-white text-xs py-2 rounded-lg transition-colors">
            Book Mock Test
          </button>
        </div>
        <div className="md:hidden flex justify-center py-2">
          <i className="fa-solid fa-circle-question text-xl"></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
