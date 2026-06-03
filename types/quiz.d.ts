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

interface QuizCard {
  id: string;
  companion_id: string;
  companions: {
    topic: string;
    subject: string;
  };
  created_at: string;
  subjectData?: {
    icon_url: string;
    color: string;
    display_name: string;
  } | null;
}

interface QuizAttempt {
  companion_id: string;
  created_at: string;
  score: number;
  questions: {
    options: string[];
    question: string;
    my_answer: number;
    explanation: string;
    correctAnswer: number;
  }[];
  correct_answers: number;
  companions: { topic: string; subject: string }[];
}
