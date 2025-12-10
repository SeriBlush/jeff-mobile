import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export type Mood = 'happy' | 'sad' | 'neutral' | 'excited' | 'calm';

export interface MoodSelectorProps {
  selectedMood?: Mood | null;
  onMoodSelect: (mood: Mood) => void;
  disabled?: boolean;
}

const MOODS: { mood: Mood; label: string; icon: string; color: string }[] = [
  { mood: 'happy', label: 'Happy', icon: 'sentiment-very-satisfied', color: '#FFD700' },
  { mood: 'sad', label: 'Sad', icon: 'sentiment-dissatisfied', color: '#4A90E2' },
  { mood: 'neutral', label: 'Neutral', icon: 'sentiment-neutral', color: '#999999' },
  { mood: 'excited', label: 'Excited', icon: 'sentiment-very-satisfied', color: '#FF6B6B' },
  { mood: 'calm', label: 'Calm', icon: 'sentiment-satisfied', color: '#4CAF50' },
];

export default function MoodSelector({ selectedMood, onMoodSelect, disabled = false }: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>How are you feeling?</Text>
      <View style={styles.moods}>
        {MOODS.map((m) => (
          <TouchableOpacity
            key={m.mood}
            style={[
              styles.moodButton,
              selectedMood === m.mood && styles.selectedMood,
              disabled && styles.disabled,
            ]}
            onPress={() => onMoodSelect(m.mood)}
            disabled={disabled}
          >
            <MaterialIcons name={m.icon} size={28} color={m.color} />
            <Text style={styles.moodLabel}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  moods: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedMood: {
    backgroundColor: '#F2F2F2',
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.5,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
});
