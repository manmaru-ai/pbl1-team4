import { View, Text, StyleSheet } from 'react-native';

export default function WeatherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>天気予報</Text>
      <Text>天気予報情報がここに表示されます。</Text>
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