interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
interface QuizScoreEntry {
  score: number;
  completed_at: string;
}