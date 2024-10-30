import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ShelterScreen from './screens/ShelterScreen';
import WeatherScreen from './screens/WeatherScreen';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Shelter: undefined;
  Weather: undefined;
};

function HomeScreen({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4a90e2', '#50c878']}
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>防災情報</Text>
          <Text style={styles.subtitle}>避難所・天気予報</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>緊急情報</Text>
            <Text style={styles.emergencyText}>現在、緊急の警報はありません</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Shelter')}
          >
            <Text style={styles.buttonText}>避難所情報</Text>
            <Text style={styles.buttonSubtext}>オフラインでも閲覧可能</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Weather')}
          >
            <Text style={styles.buttonText}>天気予報</Text>
            <Text style={styles.buttonSubtext}>複数機関の予報を比較</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light" />
      </LinearGradient>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Shelter" 
          component={ShelterScreen} 
          options={{ title: '避難所情報' }}
        />
        <Stack.Screen 
          name="Weather" 
          component={WeatherScreen} 
          options={{ title: '天気予報' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },
  infoContainer: {
    marginTop: 40,
  },
  emergencyInfo: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 10,
  },
  emergencyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});
