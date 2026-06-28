export type MessageRole = "user" | "assistant";

export interface AIMessage {
  id: string;

  role: MessageRole;

  content: string;

  timestamp: number;
}
