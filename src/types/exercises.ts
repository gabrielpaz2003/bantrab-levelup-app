export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}

export interface ExerciseModule {
  moduleId: string;
  questions: Question[];
}
