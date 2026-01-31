
import React from 'react';
import { DayLesson, LessonCategory } from '../types';

interface LessonDetailProps {
  lesson: DayLesson;
  completedTasks: string[];
  onToggleTask: (taskId: string) => void;
  onOpenTutor: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, completedTasks, onToggleTask, onOpenTutor }) => {
  const getIcon = (category: LessonCategory) => {
    switch (category) {
      case LessonCategory.GRAMMAR: return 'fa-brain text-purple-500 bg-purple-50';
      case LessonCategory.VOCABULARY: return 'fa-spell-check text-blue-500 bg-blue-50';
      case LessonCategory.READING: return 'fa-book-open text-orange-500 bg-orange-50';
      case LessonCategory.LISTENING: return 'fa-headphones text-pink-500 bg-pink-50';
      case LessonCategory.SPEAKING: return 'fa-comment text-emerald-500 bg-emerald-50';
      case LessonCategory.TECHNICAL: return 'fa-code text-indigo-500 bg-indigo-50';
      default: return 'fa-book text-slate-500 bg-slate-50';
    }
  };

  const completedCount = lesson.tasks.filter(t => completedTasks.includes(t.id)).length;
  const progress = Math.round((completedCount / lesson.tasks.length) * 100);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{lesson.title}</h2>
          <p className="text-slate-500 mt-1">{lesson.objective}</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase">Lesson Progress</p>
            <p className="text-lg font-bold text-slate-800">{completedCount}/{lesson.tasks.length}</p>
          </div>
          <div className="relative w-12 h-12">
             <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * progress / 100)}
                        className="text-blue-500 transition-all duration-700" />
             </svg>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {lesson.tasks.map((task) => (
          <div 
            key={task.id}
            className={`group bg-white p-6 rounded-3xl border-2 transition-all flex items-start gap-5 ${
              completedTasks.includes(task.id) 
                ? 'border-green-100 bg-green-50/30' 
                : 'border-slate-100 hover:border-blue-100 shadow-sm'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${getIcon(task.category)}`}>
              <i className={`fa-solid ${getIcon(task.category).split(' ')[0]}`}></i>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{task.category}</span>
                {completedTasks.includes(task.id) && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase">Completed</span>}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{task.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{task.description}</p>
              
              {task.category === LessonCategory.SPEAKING && (
                <button 
                  onClick={onOpenTutor}
                  className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-microphone"></i>
                  Start AI Practice
                </button>
              )}
            </div>

            <button 
              onClick={() => onToggleTask(task.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                completedTasks.includes(task.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 text-slate-300 hover:bg-blue-100 hover:text-blue-500'
              }`}
            >
              <i className={`fa-solid fa-check`}></i>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Feeling Unstoppable?</h3>
          <p className="text-slate-400">Take a quick self-assessment quiz to jump ahead to Day {lesson.day + 1}.</p>
        </div>
        <button className="relative z-10 whitespace-nowrap bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
          Take Quiz
        </button>
        <i className="fa-solid fa-bolt absolute -right-6 -bottom-6 text-9xl text-white/5 -rotate-12"></i>
      </div>
    </div>
  );
};

export default LessonDetail;
