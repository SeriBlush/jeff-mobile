import { useContext, useEffect, useRef, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChatContext } from '../../contexts/ChatContext';
import ChatMessage from '../../components/ChatMessage';
import InputBar from '../../components/InputBar';
import HeaderBar from '../../components/HeaderBar';
import VoiceButton from '../../components/VoiceButton';
import MoodSelector from '../../components/MoodSelector';
import { useChatAPI } from '../../hooks/useChatAPI';
import { useVoiceRecording } from '../../hooks/useVoiceRecording';
import { Mood } from '../../components/MoodSelector';

export default function ChatScreen() {
  const { messages, addMessage, isLoading: contextLoading } = useContext(ChatContext);
  const [inputText, setInputText] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const scrollViewRef = useRef(null);

  // Initialize API (use your actual API key from .env)
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '';
  const { sendMessage, isLoading, error } = useChatAPI(apiKey);
  const { isRecording, startRecording, stopRecording, cancelRecording } = useVoiceRecording();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message to context
    addMessage({
      role: 'user',
      content: inputText,
    });

    setInputText('');

    try {
      // Send to API with mood context
      const response = await sendMessage(inputText, selectedMood || undefined);

      if (response.success) {
        // Add AI response to context
        addMessage({
          role: 'assistant',
          content: response.message,
        });
      } else {
        // Show error message
        addMessage({
          role: 'assistant',
          content: `Error: ${response.error || 'Failed to get response'}`,
        });
      }
    } catch (err) {
      addMessage({
        role: 'assistant',
        content: 'Sorry, there was an error processing your message.',
      });
    }
  };

  const handleVoicePress = async () => {
    if (isRecording) {
      await stopRecording();
      // TODO: Convert voice to text and send
    } else {
      await startRecording();
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  return (
    <View style={styles.container}>
      <HeaderBar />
      <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id || `${msg.role}-${msg.timestamp}`} {...msg} />
        ))}
      </ScrollView>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <InputBar
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSendMessage}
        onVoicePress={handleVoicePress}
        disabled={isLoading || isRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  errorText: {
    color: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
});
