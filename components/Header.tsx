
import React from 'react';
import { UserProgress } from '../types';

interface HeaderProps {
  activeTab: string;
  progress: UserProgress;
}

const Header: React.FC<HeaderProps> = ({ activeTab, progress }) => {
  const titles: Record<string, string> = {
    dashboard: "My 30-Day Roadmap",
    lesson: "Daily Training",
    tutor: "AI Tutor Practice"
  };

  const percentage = Math.round((progress.completedTasks.length / 90) * 100);

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{titles[activeTab]}</h1>
        <p className="text-sm text-slate-500">Day {progress.currentDay} of 30</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Course Progress</span>
          <div className="flex items-center gap-3">
            <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-700">{percentage}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
          <i className="fa-solid fa-fire text-orange-500"></i>
          <span className="text-sm font-bold text-orange-700">3 Day Streak</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
