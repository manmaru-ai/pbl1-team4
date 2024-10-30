import { View, Text, StyleSheet } from 'react-native';

export default function ShelterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>避難所情報</Text>
      <Text>近くの避難所情報がここに表示されます。</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 