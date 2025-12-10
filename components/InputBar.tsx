import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface InputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onVoicePress?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function InputBar({
  value,
  onChangeText,
  onSend,
  onVoicePress,
  placeholder = 'Type a message...',
  disabled = false,
}: InputBarProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.voiceButton}
        onPress={onVoicePress}
        disabled={disabled}
      >
        <MaterialIcons name="mic" size={24} color="#007AFF" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        multiline
        maxLength={1000}
        editable={!disabled}
      />
      <TouchableOpacity
        style={[styles.sendButton, (!value.trim() || disabled) && styles.sendButtonDisabled]}
        onPress={onSend}
        disabled={!value.trim() || disabled}
      >
        <MaterialIcons name="send" size={24} color={!value.trim() || disabled ? '#CCCCCC' : '#007AFF'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  voiceButton: {
    padding: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
    fontSize: 16,
    maxHeight: 100,
    color: '#000000',
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
