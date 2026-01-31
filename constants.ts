
import { DayLesson, LessonCategory } from './types';

export const CURRICULUM: DayLesson[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const week = Math.floor(i / 7) + 1;

  const techTopics = [
    "Explaining Logic", "Code Documentation", "Daily Standups", 
    "Bug Reports", "API Documentation", "Pull Request Reviews",
    "Technical Interviews", "System Design Discussions"
  ];

  return {
    day,
    title: `Day ${day}: ${day % 7 === 0 ? 'Weekly Review' : 'Level Up Practice'}`,
    objective: day % 5 === 0 
      ? `Master B1 technical English for ${techTopics[Math.floor(day/5) % techTopics.length]}.`
      : `Master B1 level ${day % 3 === 0 ? 'complex sentence structures' : 'topic-specific vocabulary'}.`,
    tasks: [
      {
        id: `d${day}-t1`,
        category: day % 5 === 0 ? LessonCategory.TECHNICAL : LessonCategory.GRAMMAR,
        title: day % 5 === 0 ? `Describing ${techTopics[Math.floor(day/5) % techTopics.length]}` : (day <= 7 ? "Present Perfect vs Simple Past" : "Conditionals & Future Forms"),
        description: day % 5 === 0 
          ? `Learn how to explain this technical concept using B1 transition words like 'furthermore' and 'consequently'.`
          : "Study the rules and complete 10 practice sentences.",
        completed: false
      },
      {
        id: `d${day}-t2`,
        category: LessonCategory.VOCABULARY,
        title: day <= 15 ? "Describing People & Places" : "Workplace & Formal Terms",
        description: "Learn 15 new B1 level words for this topic.",
        completed: false
      },
      {
        id: `d${day}-t3`,
        category: LessonCategory.SPEAKING,
        title: "AI Tutor Conversation",
        description: "Spend 5 minutes discussing your day with the AI Tutor.",
        completed: false
      }
    ]
  };
});
