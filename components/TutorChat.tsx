
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getTutorResponse, checkGrammar } from '../services/geminiService';

const TutorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hello! I'm your LevelUp Tutor. How is your English practice going today? Can you tell me what you've learned so far?", 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [grammarFeedback, setGrammarFeedback] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setGrammarFeedback(null);

    // Get tutor response
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await getTutorResponse(history, input);
    
    // Asynchronously check grammar for feedback
    checkGrammar(input).then(feedback => {
      if (feedback && !feedback.isCorrect) {
        setGrammarFeedback(feedback);
      }
    });

    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response, 
      timestamp: new Date() 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">AI Tutor</h3>
            <span className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              B1 Specialist
            </span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white shadow-sm border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {grammarFeedback && (
        <div className="p-4 bg-orange-50 border-t border-orange-100 animate-fade-in">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-wand-magic-sparkles text-orange-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold text-orange-800 uppercase mb-1">Grammar Tip</p>
              <p className="text-sm text-orange-900 font-medium">Try saying: "{grammarFeedback.betterVersion}"</p>
              <p className="text-xs text-orange-700 mt-1">{grammarFeedback.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message in English..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-blue-200"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default TutorChat;
