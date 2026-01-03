export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  aiSolution: string;
  imageUrl: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export enum ChatMode {
  TEXT = 'TEXT',
  VOICE = 'VOICE'
}

export interface LiveConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}
