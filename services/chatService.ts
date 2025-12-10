import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mood?: string;
}

export interface ChatServiceConfig {
  apiKey: string;
  modelName?: string;
}

class ChatService {
  private client: GoogleGenerativeAI | null = null;
  private modelName: string = 'gemini-pro';
  private messageHistory: ChatMessage[] = [];
  private conversationHistory: Array<{ role: string; parts: string }> = [];

  constructor(config: ChatServiceConfig) {
    if (!config.apiKey) {
      throw new Error('Google Gemini API key is required');
    }
    this.client = new GoogleGenerativeAI(config.apiKey);
    if (config.modelName) {
      this.modelName = config.modelName;
    }
  }

  async sendMessage(
    message: string,
    mood?: string,
  ): Promise<ChatMessage> {
    if (!this.client) {
      throw new Error('Chat client not initialized');
    }

    try {
      // Add user message to history
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        mood,
      };

      this.messageHistory.push(userMessage);
      this.conversationHistory.push({
        role: 'user',
        parts: message,
      });

      // Initialize the model
      const model = this.client.getGenerativeModel({ model: this.modelName });

      // Prepare system prompt with mood context
      const systemPrompt = mood
        ? `You are Jeff, a helpful AI assistant. The user is currently feeling ${mood}. Be empathetic and supportive in your response.`
        : 'You are Jeff, a helpful AI assistant. Provide thoughtful and supportive responses.';

      // Use startChat for multi-turn conversation
      const chat = model.startChat({
        history: this.conversationHistory.map((msg) => ({
          role: msg.role as 'user' | 'model',
          parts: msg.parts,
        })),
      });

      // Send message and get response
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const assistantText = response.text();

      // Add assistant response to history
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: assistantText,
        timestamp: new Date(),
      };

      this.messageHistory.push(assistantMessage);
      this.conversationHistory.push({
        role: 'model',
        parts: assistantText,
      });

      return assistantMessage;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Chat service error: ${errorMessage}`);
    }
  }

  getMessageHistory(): ChatMessage[] {
    return [...this.messageHistory];
  }

  clearHistory(): void {
    this.messageHistory = [];
    this.conversationHistory = [];
  }

  clearMessageHistory(): void {
    this.messageHistory = [];
  }
}

export default ChatService;
