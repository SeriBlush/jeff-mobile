import { useContext, useEffect, useState, useRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChatContext } from '../contexts/ChatContext';
import ChatMessage from '../components/ChatMessage';
import InputBar from '../components/InputBar';
import HeaderBar from '../components/HeaderBar';

export default function ChatScreen() {
  const { messages, sendMessage, loading } = useContext(ChatContext);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar title="Jeff AI" />
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
      </ScrollView>
      <InputBar
        inputText={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
});
