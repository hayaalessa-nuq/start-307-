export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface Challenge {
  goal: number;
  description: string;
  startCount: number;
}

export interface Badge {
  name: string;
  milestone: number;
}
