import { create } from 'zustand';
import type { CoachSession, CoachMessage } from '../types/coach';

interface CoachState {
  currentSession: CoachSession | null;
  sessions: CoachSession[];
  isLoading: boolean;

  startSession: (userId: string) => void;
  addMessage: (message: Omit<CoachMessage, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  endSession: () => void;
  loadSession: (sessionId: string) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export const useCoachStore = create<CoachState>((set, get) => ({
  currentSession: null,
  sessions: [],
  isLoading: false,

  startSession: (userId) => {
    const now = new Date().toISOString();
    const session: CoachSession = {
      id: generateId(),
      userId,
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
    set({ currentSession: session });
  },

  addMessage: (messageData) =>
    set((state) => {
      if (!state.currentSession) return state;
      const message: CoachMessage = {
        ...messageData,
        id: generateId(),
        timestamp: new Date().toISOString(),
      };
      return {
        currentSession: {
          ...state.currentSession,
          messages: [...state.currentSession.messages, message],
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  setLoading: (isLoading) => set({ isLoading }),

  endSession: () =>
    set((state) => {
      if (!state.currentSession) return state;
      return {
        sessions: [state.currentSession, ...state.sessions],
        currentSession: null,
      };
    }),

  loadSession: (sessionId) => {
    const session = get().sessions.find((s) => s.id === sessionId);
    if (session) {
      set({ currentSession: { ...session } });
    }
  },
}));
