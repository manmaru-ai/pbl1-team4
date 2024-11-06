import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseShelterData, findNearestShelters, type Shelter } from '../utils/shelterUtils';

export default function ShelterScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [nearestShelters, setNearestShelters] = useState<Shelter[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('位置情報へのアクセスが許可されていません');
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const shelters = parseShelterData();
      const nearest = findNearestShelters(location, shelters);
      setNearestShelters(nearest);

    } catch (err) {
      setError('避難所情報の読み込みに失敗しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1a56db" />
        <Text style={styles.loadingText}>避難所情報を読み込んでいます...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="warning" size={48} color="#dc2626" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadShelters}>
          <Text style={styles.retryButtonText}>再試行</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.offlineNotice}>
        <Ionicons name="information-circle" size={16} color="#1a56db" />
        <Text style={styles.offlineText}>オフラインでも閲覧可能です</Text>
      </View>

      <View style={styles.sheltersList}>
        {nearestShelters.map((shelter) => (
          <View key={shelter.id} style={styles.shelterCard}>
            <View style={styles.shelterHeader}>
              <Text style={styles.shelterName}>{shelter.name}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>最寄り</Text>
              </View>
            </View>

            <View style={styles.shelterInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color="#6b7280" />
                <Text style={styles.infoText}>{shelter.address}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark" size={16} color="#6b7280" />
                <Text style={styles.infoText}>
                  対応災害: {shelter.types.join(', ')}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="navigate" size={16} color="#6b7280" />
                <Text style={styles.infoText}>
                  現在地からの距離: {shelter.distance ? Math.round(shelter.distance * 10) / 10 : '不明'}km
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`;
                Linking.openURL(url);
              }}
            >
              <Text style={styles.detailsButtonText}>経路を表示</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  offlineText: {
    color: '#1a56db',
    fontSize: 14,
  },
  sheltersList: {
    padding: 16,
    gap: 16,
  },
  shelterCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shelterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shelterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#dcfce7',
  },
  statusPreparing: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  shelterInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
  },
  detailsButton: {
    backgroundColor: '#1a56db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#374151',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#1a56db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});