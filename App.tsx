import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Modal, Platform, StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ShelterScreen from './screens/ShelterScreen';
import WeatherScreen from './screens/WeatherScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import DisasterMapScreen from './screens/DisasterMapScreen';
import EmergencyKitScreen from './screens/EmergencyKitScreen';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Shelter: undefined;
  Weather: undefined;
  Settings: undefined;
  About: undefined;
  DisasterMap: undefined;
  EmergencyKit: undefined;
};

function HomeScreen({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);

  const emergencyNotices = [
    { id: 1, time: '2024.10.20 10:15', type: '気象警報・注意報', icon: '⚠️' },
    { id: 2, time: '2024.10.19 15:29', type: '気象警報・注意報', icon: '⚠️' },
    { id: 3, time: '2024.10.18 12:26', type: '避難情報発表中', icon: '⚡' },
    { id: 4, time: '2024.10.17 14:25', type: '気象警報・注意報', icon: '⚠️' },
    { id: 5, time: '2024.10.16 14:42', type: '気象警報・注意報', icon: '⚠️' },
  ];

  const menuItems = [
    { icon: 'home', title: 'ホーム', onPress: () => { navigation.navigate('Home'); setIsMenuVisible(false); } },
    { icon: 'location', title: '避難所情報', onPress: () => { navigation.navigate('Shelter'); setIsMenuVisible(false); } },
    { icon: 'cloud', title: '天気予報', onPress: () => { navigation.navigate('Weather'); setIsMenuVisible(false); } },
    { icon: 'map', title: '災害マップ', onPress: () => { navigation.navigate('DisasterMap'); setIsMenuVisible(false); } },
    { icon: 'medical', title: '防災グッズ', onPress: () => { navigation.navigate('EmergencyKit'); setIsMenuVisible(false); } },
    { icon: 'settings', title: '設定', onPress: () => { navigation.navigate('Settings'); setIsMenuVisible(false); } },
    { icon: 'information-circle', title: 'アプリについて', onPress: () => { navigation.navigate('About'); setIsMenuVisible(false); } },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>寝屋川市防災</Text>
          <TouchableOpacity onPress={() => setIsNotificationsVisible(true)}>
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>
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

      <Modal
        visible={isMenuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>メニュー</Text>
              <TouchableOpacity onPress={() => setIsMenuVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon as any} size={24} color="#1a56db" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isNotificationsVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsNotificationsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationsContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>通知</Text>
              <TouchableOpacity onPress={() => setIsNotificationsVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {emergencyNotices.map((notice) => (
                <View key={notice.id} style={styles.notificationItem}>
                  <Text style={styles.noticeIcon}>{notice.icon}</Text>
                  <View style={styles.noticeContent}>
                    <Text style={styles.noticeTime}>{notice.time}</Text>
                    <Text style={styles.noticeType}>{notice.type}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: '設定' }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ title: 'アプリについて' }}
        />
        <Stack.Screen 
          name="DisasterMap" 
          component={DisasterMapScreen} 
          options={{ title: '災害マップ' }}
        />
        <Stack.Screen 
          name="EmergencyKit" 
          component={EmergencyKitScreen} 
          options={{ title: '防災グッズ管理' }}
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
  headerContainer: {
    backgroundColor: '#1a56db',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0,
  },
  notificationsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#111827',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
