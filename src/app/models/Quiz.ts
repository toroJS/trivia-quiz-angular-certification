export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum Type {
  MULTIPLE = 'multiple',
  BOOLEAM = 'boolean',
}

export interface QuizParameters {
  amount: number;
  category: number;
  difficulty: Difficulty;
  type?: Type;
}

export interface QuizApiResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface QuizQuestion {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Quiz {
  question: string;
  options: string[];
  selectedOption: string;
  correctAnswer: string;
}
