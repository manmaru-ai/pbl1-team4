import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { parseShelterData, type Shelter } from '../utils/shelterUtils';

export default function DisasterMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [region, setRegion] = useState({
    latitude: 34.7666,
    longitude: 135.6281,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }

      const shelterData = parseShelterData();
      setShelters(shelterData);
    } catch (error) {
      console.error('データの読み込みに失敗:', error);
    }
  };

  const getMarkerColor = (types: string[]) => {
    if (types.includes('津波')) return '#ef4444';
    if (types.includes('洪水')) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {shelters.map(shelter => (
          <Marker
            key={shelter.id}
            coordinate={{
              latitude: shelter.latitude,
              longitude: shelter.longitude
            }}
            pinColor={getMarkerColor(shelter.types)}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{shelter.name}</Text>
                <Text style={styles.calloutDescription}>{shelter.address}</Text>
                <Text style={styles.calloutTypes}>
                  対応災害: {shelter.types.join(', ')}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>避難所の種類</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#22c55e' }]} />
          <Text style={styles.legendText}>一般避難所</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#f59e0b' }]} />
          <Text style={styles.legendText}>洪水対応</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#ef4444' }]} />
          <Text style={styles.legendText}>津波対応</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  legend: {
    position: 'absolute',
    left: 16,
    bottom: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#374151',
  },
  callout: {
    padding: 8,
    maxWidth: 200,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
  },
  calloutTypes: {
    fontSize: 12,
    color: '#6b7280',
  },
}); 