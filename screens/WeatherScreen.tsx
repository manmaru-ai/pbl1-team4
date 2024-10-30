import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WeatherScreen() {
  const weatherData = [
    {
      provider: '気象庁',
      forecasts: [
        { day: '今日', weather: '晴れ', temp: '23°C', rain: '10%' },
        { day: '明日', weather: '曇り', temp: '22°C', rain: '30%' },
        { day: '明後日', weather: '雨', temp: '20°C', rain: '80%' },
      ],
    },
    {
      provider: 'WeatherNews',
      forecasts: [
        { day: '今日', weather: '晴れ', temp: '24°C', rain: '20%' },
        { day: '明日', weather: '曇り', temp: '21°C', rain: '40%' },
        { day: '明後日', weather: '雨', temp: '19°C', rain: '90%' },
      ],
    },
  ];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case '晴れ':
        return <Ionicons name="sunny" size={24} color="#f59e0b" />;
      case '曇り':
        return <Ionicons name="cloud" size={24} color="#6b7280" />;
      case '雨':
        return <Ionicons name="rainy" size={24} color="#3b82f6" />;
      default:
        return <Ionicons name="cloud" size={24} color="#6b7280" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Weather Alert */}
      <View style={styles.alertContainer}>
        <Ionicons name="warning" size={20} color="#dc2626" />
        <Text style={styles.alertText}>大雨警報が発令されています</Text>
      </View>

      {/* Weather Providers */}
      {weatherData.map((provider, index) => (
        <View key={index} style={styles.providerCard}>
          <Text style={styles.providerName}>{provider.provider}</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.forecastContainer}>
              {provider.forecasts.map((forecast, fIndex) => (
                <View key={fIndex} style={styles.forecastCard}>
                  <Text style={styles.dayText}>{forecast.day}</Text>
                  {getWeatherIcon(forecast.weather)}
                  <Text style={styles.weatherText}>{forecast.weather}</Text>
                  <Text style={styles.tempText}>{forecast.temp}</Text>
                  <View style={styles.rainChance}>
                    <Ionicons name="rainy" size={16} color="#3b82f6" />
                    <Text style={styles.rainText}>{forecast.rain}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Ionicons name="refresh" size={20} color="white" />
        <Text style={styles.updateButtonText}>最新の天気を更新</Text>
      </TouchableOpacity>

      {/* Last Updated */}
      <Text style={styles.lastUpdated}>
        最終更新: 2024年4月18日 16:14
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    gap: 8,
  },
  alertText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: 'bold',
  },
  providerCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  forecastContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  forecastCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    width: 100,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151',
  },
  weatherText: {
    fontSize: 14,
    marginTop: 8,
    color: '#374151',
  },
  tempText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#111827',
  },
  rainChance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  rainText: {
    fontSize: 14,
    color: '#3b82f6',
  },
  updateButton: {
    flexDirection: 'row',
    backgroundColor: '#1a56db',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastUpdated: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 12,
    marginBottom: 16,
  },
});