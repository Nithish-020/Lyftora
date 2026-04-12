export interface Post {
  id: string;
  userId: string;
  type: 'workout' | 'achievement' | 'progress';
  content: string;
  workoutId?: string;
  likes: number;
  comments: number;
  createdAt: string;
}
