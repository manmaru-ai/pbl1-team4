import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ShelterScreen() {
  const shelters = [
    {
      id: 1,
      name: '東小学校',
      address: '寝屋川市太秦元町2-1',
      capacity: '避難所',
      phone: '072-825-9001',
      status: '開設準備中',
    },
    {
      id: 2,
      name: '第一中学校',
      address: '寝屋川市高宮新町32-1',
      capacity: '避難所',
      phone: '072-825-9000',
      status: '開設準備中',
    },
    {
      id: 3,
      name: '市民会館',
      address: '寝屋川市秦町41-1',
      capacity: '大ホール1,203席、小ホール200人',
      phone: '072-823-1221',
      status: '開設中',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Offline Notice */}
      <View style={styles.offlineNotice}>
        <Ionicons name="information-circle" size={16} color="#1a56db" />
        <Text style={styles.offlineText}>オフラインでも閲覧可能です</Text>
      </View>

      {/* Shelters List */}
      <View style={styles.sheltersList}>
        {shelters.map((shelter) => (
          <View key={shelter.id} style={styles.shelterCard}>
            <View style={styles.shelterHeader}>
              <Text style={styles.shelterName}>{shelter.name}</Text>
              <View style={[
                styles.statusBadge,
                shelter.status === '開設中' ? styles.statusOpen : styles.statusPreparing
              ]}>
                <Text style={styles.statusText}>{shelter.status}</Text>
              </View>
            </View>

            <View style={styles.shelterInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={16} color="#6b7280" />
                <Text style={styles.infoText}>{shelter.address}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="people" size={16} color="#6b7280" />
                <Text style={styles.infoText}>{shelter.capacity}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="call" size={16} color="#6b7280" />
                <Text style={styles.infoText}>{shelter.phone}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>詳細を見る</Text>
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
});