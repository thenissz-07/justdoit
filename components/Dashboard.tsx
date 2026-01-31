
import React from 'react';
import { CURRICULUM } from '../constants';
import { UserProgress } from '../types';

interface DashboardProps {
  progress: UserProgress;
  onSelectDay: (day: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onSelectDay }) => {
  return (
    <div className="animate-fade-in space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
            <p className="text-blue-100 mb-6 max-w-md">You're making great progress. Complete today's tasks to stay on track for your B1 certificate.</p>
            <button 
              onClick={() => onSelectDay(progress.currentDay)}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Start Day {progress.currentDay}
            </button>
          </div>
          <i className="fa-solid fa-rocket absolute -right-4 -bottom-4 text-9xl text-white/10 rotate-12"></i>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-trophy text-yellow-500"></i>
              Weekly Goal
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Practice Conversations</span>
                <span className="font-bold">3/5</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-yellow-400"></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Vocab Mastered</span>
                <span className="font-bold">42/100</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-green-400"></div>
              </div>
            </div>
          </div>
          <button className="mt-6 text-sm text-blue-600 font-bold hover:underline">View All Badges →</button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-calendar-days text-blue-500"></i>
          Your 30-Day Program
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CURRICULUM.map((lesson) => {
            const isCompleted = lesson.day < progress.currentDay;
            const isCurrent = lesson.day === progress.currentDay;
            const isLocked = lesson.day > progress.currentDay + 2; // Preview only 2 days ahead

            return (
              <button
                key={lesson.day}
                disabled={isLocked}
                onClick={() => onSelectDay(lesson.day)}
                className={`relative group h-32 rounded-2xl p-4 transition-all flex flex-col justify-between text-left ${
                  isCurrent 
                    ? 'ring-2 ring-blue-500 bg-white shadow-xl scale-105 z-10' 
                    : isCompleted 
                    ? 'bg-green-50 text-green-700 border border-green-100' 
                    : isLocked 
                    ? 'bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed'
                    : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase">Day {lesson.day}</span>
                    {isCompleted && <i className="fa-solid fa-circle-check text-green-500"></i>}
                    {isLocked && <i className="fa-solid fa-lock text-slate-300 text-xs"></i>}
                  </div>
                  <h4 className={`text-sm font-bold leading-tight ${isCurrent ? 'text-slate-900' : ''}`}>
                    {lesson.title.split(': ')[1]}
                  </h4>
                </div>
                
                {isCurrent && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                    <span className="uppercase">Resume</span>
                    <i className="fa-solid fa-arrow-right animate-bounce-x"></i>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
