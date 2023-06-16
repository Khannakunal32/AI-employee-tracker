import { StyleSheet, View } from 'react-native';
import AiChatBot from './src';

export default function App() {
  return (
    <View style={styles.container}>
       <AiChatBot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
