import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

type DisasterPoint = {
  id: string;
  type: 'flood' | 'landslide' | 'shelter' | 'emergency';
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  severity?: 'high' | 'medium' | 'low';
};

export default function DisasterMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string[]>(['shelter']);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const disasterPoints: DisasterPoint[] = [
    {
      id: '1',
      type: 'flood',
      title: '浸水警戒区域',
      description: '水位上昇中 - 警戒レベル3',
      coordinate: { latitude: 34.7666, longitude: 135.6281 },
      severity: 'high'
    },
    {
      id: '2',
      type: 'shelter',
      title: '寝屋川市民体育館',
      description: '収容可能人数: 500人\n現在の人数: 120人',
      coordinate: { latitude: 34.7650, longitude: 135.6270 }
    },
    // 他の災害ポイントを追加
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const getMarkerColor = (type: string, severity?: string) => {
    switch (type) {
      case 'flood': return severity === 'high' ? '#ef4444' : '#f59e0b';
      case 'landslide': return '#dc2626';
      case 'shelter': return '#22c55e';
      case 'emergency': return '#7c3aed';
      default: return '#3b82f6';
    }
  };

  const LayerFilter = () => (
    <Modal
      visible={isFilterVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsFilterVisible(false)}
    >
      <View style={styles.filterModal}>
        <View style={styles.filterContent}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>表示する情報</Text>
            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
              <Ionicons name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>
          
          {[
            { id: 'shelter', icon: 'home', label: '避難所' },
            { id: 'flood', icon: 'water', label: '浸水区域' },
            { id: 'landslide', icon: 'warning', label: '土砂災害' },
            { id: 'emergency', icon: 'alert-circle', label: '緊急地点' }
          ].map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.filterItem}
              onPress={() => {
                setSelectedLayer(prev => 
                  prev.includes(item.id)
                    ? prev.filter(i => i !== item.id)
                    : [...prev, item.id]
                );
              }}
            >
              <View style={styles.filterItemContent}>
                <Ionicons name={item.icon as any} size={24} color="#374151" />
                <Text style={styles.filterItemText}>{item.label}</Text>
              </View>
              <View style={[
                styles.checkbox,
                selectedLayer.includes(item.id) && styles.checkboxSelected
              ]}>
                {selectedLayer.includes(item.id) && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 34.7666,
          longitude: 135.6281,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {disasterPoints
          .filter(point => selectedLayer.includes(point.type))
          .map(point => (
            <Marker
              key={point.id}
              coordinate={point.coordinate}
              pinColor={getMarkerColor(point.type, point.severity)}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{point.title}</Text>
                  <Text style={styles.calloutDescription}>{point.description}</Text>
                </View>
              </Callout>
            </Marker>
          ))
        }
      </MapView>

      <TouchableOpacity
        style={styles.layerButton}
        onPress={() => setIsFilterVisible(true)}
      >
        <Ionicons name="layers" size={24} color="white" />
      </TouchableOpacity>

      <LayerFilter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  layerButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#1a56db',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  filterItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterItemText: {
    fontSize: 16,
    color: '#374151',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1a56db',
    borderColor: '#1a56db',
  },
  callout: {
    padding: 8,
    maxWidth: 200,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#374151',
  },
}); 