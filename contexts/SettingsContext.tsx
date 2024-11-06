import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsContextType = {
  notifications: boolean;
  locationServices: boolean;
  offlineMode: boolean;
  setNotifications: (value: boolean) => void;
  setLocationServices: (value: boolean) => void;
  setOfflineMode: (value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setNotifications(parsedSettings.notifications);
        setLocationServices(parsedSettings.locationServices);
        setOfflineMode(parsedSettings.offlineMode);
      }
    } catch (error) {
      console.error('設定の読み込みに失敗しました:', error);
    }
  };

  const saveSettings = async (newSettings: any) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('設定の保存に失敗しました:', error);
    }
  };

  const handleSetNotifications = (value: boolean) => {
    setNotifications(value);
    saveSettings({ notifications: value, locationServices, offlineMode });
  };

  const handleSetLocationServices = (value: boolean) => {
    setLocationServices(value);
    saveSettings({ notifications, locationServices: value, offlineMode });
  };

  const handleSetOfflineMode = (value: boolean) => {
    setOfflineMode(value);
    saveSettings({ notifications, locationServices, offlineMode: value });
  };

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        locationServices,
        offlineMode,
        setNotifications: handleSetNotifications,
        setLocationServices: handleSetLocationServices,
        setOfflineMode: handleSetOfflineMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 