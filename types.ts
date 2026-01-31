
export enum LessonCategory {
  GRAMMAR = 'Grammar',
  VOCABULARY = 'Vocabulary',
  READING = 'Reading',
  LISTENING = 'Listening',
  SPEAKING = 'Speaking',
  TECHNICAL = 'Technical English'
}

export interface Task {
  id: string;
  title: string;
  category: LessonCategory;
  description: string;
  completed: boolean;
}

export interface DayLesson {
  day: number;
  title: string;
  objective: string;
  tasks: Task[];
}

export interface UserProgress {
  currentDay: number;
  completedTasks: string[];
  lastActive: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
