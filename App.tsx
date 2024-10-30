import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ShelterScreen from './screens/ShelterScreen';
import WeatherScreen from './screens/WeatherScreen';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Shelter: undefined;
  Weather: undefined;
};

function HomeScreen({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  const emergencyNotices = [
    { id: 1, time: '2024.10.20 10:15', type: '気象警報・注意報', icon: '⚠️' },
    { id: 2, time: '2024.10.19 15:29', type: '気象警報・注意報', icon: '⚠️' },
    { id: 3, time: '2024.10.18 12:26', type: '避難情報発表中', icon: '⚡' },
    { id: 4, time: '2024.10.17 14:25', type: '気象警報・注意報', icon: '⚠️' },
    { id: 5, time: '2024.10.16 14:42', type: '気象警報・注意報', icon: '⚠️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="white" />
        <Text style={styles.headerTitle}>寝屋川市防災</Text>
        <Ionicons name="notifications" size={24} color="white" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.noticesContainer}>
          {emergencyNotices.map((notice) => (
            <TouchableOpacity key={notice.id} style={styles.noticeItem}>
              <Text style={styles.noticeIcon}>{notice.icon}</Text>
              <View style={styles.noticeContent}>
                <Text style={styles.noticeTime}>{notice.time}</Text>
                <Text style={styles.noticeType}>{notice.type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Shelter')}
          >
            <Ionicons name="location" size={24} color="white" />
            <Text style={styles.actionButtonText}>避難所情報</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.weatherButton]}
            onPress={() => navigation.navigate('Weather')}
          >
            <Ionicons name="cloud" size={24} color="white" />
            <Text style={styles.actionButtonText}>天気予報</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.offlineStatus}>
          <Ionicons name="refresh" size={16} color="#666" />
          <Text style={styles.offlineText}>最終更新: 2024年10月20日 16:14</Text>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a56db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
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
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#1a56db',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  noticesContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  noticeType: {
    fontSize: 14,
    color: '#111827',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherButton: {
    backgroundColor: '#f59e0b',
  },
  actionButtonText: {
    color: 'white',
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  offlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  offlineText: {
    color: '#666',
    fontSize: 12,
  },
});
