export interface CoachMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: CoachMessageMetadata;
}

export interface CoachMessageMetadata {
  planGenerated?: boolean;
  exercisesRecommended?: string[];
  mealsRecommended?: string[];
}

export interface CoachSession {
  id: string;
  userId: string;
  messages: CoachMessage[];
  createdAt: string;
  updatedAt: string;
}
