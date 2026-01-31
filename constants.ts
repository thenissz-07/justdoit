
import { DayLesson, LessonCategory } from './types';

export const CURRICULUM: DayLesson[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  
  // Categorization logic for a structured month
  const week = Math.floor(i / 7) + 1;
  
  const weeklyThemes = [
    "Building Foundations (Daily Life)",
    "Work & Ambition",
    "Social Issues & Opinions",
    "Advanced Communication & Exam Prep",
    "Final Review"
  ];

  return {
    day,
    title: `Day ${day}: ${day % 7 === 0 ? 'Weekly Review' : 'Level Up Practice'}`,
    objective: `Master B1 level ${day % 3 === 0 ? 'complex sentence structures' : 'topic-specific vocabulary'}.`,
    tasks: [
      {
        id: `d${day}-t1`,
        category: LessonCategory.GRAMMAR,
        title: day <= 7 ? "Present Perfect vs Simple Past" : "Conditionals & Future Forms",
        description: "Study the rules and complete 10 practice sentences.",
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
