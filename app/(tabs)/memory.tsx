import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderBar from '../../components/HeaderBar';

interface Memory {
  id: string;
  title: string;
  timestamp: string;
  content: string;
}

export default function MemoryScreen() {
  const memories: Memory[] = [];

  return (
    <View style={styles.container}>
      <HeaderBar title="Memory" />
      {memories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="brain" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No memories saved yet</Text>
        </View>
      ) : (
        <FlatList
          data={memories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.memoryItem}>
              <Text style={styles.memoryTitle}>{item.title}</Text>
              <Text style={styles.memoryTime}>{item.timestamp}</Text>
              <Text style={styles.memoryContent}>{item.content}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
  memoryItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  memoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  memoryTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  memoryContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
