
import React, { useState, useEffect } from 'react';
import { CURRICULUM } from './constants';
import { DayLesson, UserProgress, Task } from './types';
import Dashboard from './components/Dashboard';
import LessonDetail from './components/LessonDetail';
import TutorChat from './components/TutorChat';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lesson' | 'tutor'>('dashboard');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('levelup_progress');
    return saved ? JSON.parse(saved) : {
      currentDay: 1,
      completedTasks: [],
      lastActive: new Date().toISOString()
    };
  });

  const [selectedDay, setSelectedDay] = useState<DayLesson>(CURRICULUM[progress.currentDay - 1] || CURRICULUM[0]);

  useEffect(() => {
    localStorage.setItem('levelup_progress', JSON.stringify(progress));
  }, [progress]);

  const toggleTask = (taskId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedTasks.includes(taskId);
      const newCompleted = isCompleted 
        ? prev.completedTasks.filter(id => id !== taskId)
        : [...prev.completedTasks, taskId];
      
      return { ...prev, completedTasks: newCompleted };
    });
  };

  const selectDay = (day: number) => {
    setSelectedDay(CURRICULUM[day - 1]);
    setActiveTab('lesson');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard progress={progress} onSelectDay={selectDay} />;
      case 'lesson':
        return <LessonDetail 
                  lesson={selectedDay} 
                  completedTasks={progress.completedTasks}
                  onToggleTask={toggleTask}
                  onOpenTutor={() => setActiveTab('tutor')}
               />;
      case 'tutor':
        return <TutorChat />;
      default:
        return <Dashboard progress={progress} onSelectDay={selectDay} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeTab={activeTab} progress={progress} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
