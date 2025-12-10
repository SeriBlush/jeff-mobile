export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mood?: string;
}

export interface ChatServiceConfig {
  apiEndpoint: string;
  apiKey?: string;
  timeout?: number;
}

class ChatService {
  private apiEndpoint: string;
  private apiKey?: string;
  private timeout: number = 30000; // 30 seconds default
  private messageHistory: ChatMessage[] = [];

  constructor(config: ChatServiceConfig) {
    this.apiEndpoint = config.apiEndpoint;
    this.apiKey = config.apiKey;
    if (config.timeout) {
      this.timeout = config.timeout;
    }
  }

  async sendMessage(
    message: string,
    mood?: string,
  ): Promise<ChatMessage> {
    try {
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        mood,
      };

      this.messageHistory.push(userMessage);

      // Make API call
      const response = await this.fetchWithTimeout(
        this.apiEndpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
          },
          body: JSON.stringify({
            message,
            mood,
            conversationId: this.getConversationId(),
          }),
        },
      );

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: data.id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: data.reply || 'Unable to process your message',
        timestamp: new Date(),
      };

      this.messageHistory.push(assistantMessage);
      return assistantMessage;
    } catch (error) {
      throw new Error(
        `Chat service error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private getConversationId(): string {
    // In a real app, this would be a proper conversation ID
    return `conv_${Math.random().toString(36).substr(2, 9)}`;
  }

  private fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    return fetch(url, {
      ...options,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));
  }

  getMessageHistory(): ChatMessage[] {
    return [...this.messageHistory];
  }

  clearHistory(): void {
    this.messageHistory = [];
  }
}

export default ChatService;
