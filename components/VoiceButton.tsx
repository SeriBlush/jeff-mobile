import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface VoiceButtonProps {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export default function VoiceButton({ isRecording, onPress, disabled = false }: VoiceButtonProps) {
  const [scale] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1.2,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.5,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else {
      scale.setValue(1);
      opacity.setValue(1);
    }
  }, [isRecording, scale, opacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.touchable, isRecording && styles.recordingState, disabled && styles.disabled]}
          onPress={onPress}
          disabled={disabled}
        >
          <MaterialIcons
            name={isRecording ? 'stop' : 'mic'}
            size={32}
            color={isRecording ? '#FF3B30' : '#007AFF'}
          />
        </TouchableOpacity>
      </Animated.View>
      {isRecording && <Text style={styles.recordingText}>Recording...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
  },
  touchable: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingState: {
    backgroundColor: '#FFE5E5',
  },
  disabled: {
    opacity: 0.5,
  },
  recordingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#FF3B30',
    fontWeight: '600',
  },
});
