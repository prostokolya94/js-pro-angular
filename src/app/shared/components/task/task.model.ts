export interface Task {
  id: string;
  title: string;
  description: string;
  inputExamples: string[];
  outputExamples: string[];
  difficultyLevel: number;
  tags: string[];
}
