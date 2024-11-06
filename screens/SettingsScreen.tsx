import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '../contexts/SettingsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const {
    notifications,
    locationServices,
    offlineMode,
    setNotifications,
    setLocationServices,
    setOfflineMode,
  } = useSettings();

  const handleDataClear = () => {
    Alert.alert(
      'データを削除',
      'キャッシュされたすべてのデータを削除してもよろしいですか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel'
        },
        {
          text: '削除',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('完了', 'すべてのデータが削除されました');
            } catch (error) {
              Alert.alert('エラー', 'データの削除に失敗しました');
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通知設定</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Ionicons name="notifications" size={22} color="#374151" />
            <Text style={styles.settingText}>緊急速報</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={notifications ? '#1a56db' : '#f3f4f6'}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Ionicons name="location" size={22} color="#374151" />
            <Text style={styles.settingText}>位置情報サービス</Text>
          </View>
          <Switch
            value={locationServices}
            onValueChange={setLocationServices}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={locationServices ? '#1a56db' : '#f3f4f6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アプリ設定</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Ionicons name="cloud-offline" size={22} color="#374151" />
            <Text style={styles.settingText}>オフラインモード</Text>
          </View>
          <Switch
            value={offlineMode}
            onValueChange={setOfflineMode}
            trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
            thumbColor={offlineMode ? '#1a56db' : '#f3f4f6'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>データ管理</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleDataClear}>
          <View style={styles.settingContent}>
            <Ionicons name="trash" size={22} color="#dc2626" />
            <Text style={[styles.settingText, { color: '#dc2626' }]}>キャッシュを削除</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>その他</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingContent}>
            <Ionicons name="information-circle" size={22} color="#374151" />
            <Text style={styles.settingText}>バージョン</Text>
          </View>
          <Text style={styles.versionText}>1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 8,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#374151',
  },
  versionText: {
    fontSize: 16,
    color: '#6b7280',
  },
}); 