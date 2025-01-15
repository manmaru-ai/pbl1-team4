import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={64} color="#1a56db" />
        <Text style={styles.appName}>緊急避難サポート</Text>
        <Text style={styles.version}>バージョン 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>アプリについて</Text>
        <Text style={styles.description}>
          緊急避難サポートアプリは、市民の皆様の安全を第一に考え、災害時の迅速な情報提供と避難支援を目的として開発されました。
          気象警報や避難情報をリアルタイムで受け取り、近くの避難所情報を簡単に確認することができます。
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>主な機能</Text>
        <View style={styles.featureItem}>
          <Ionicons name="warning" size={24} color="#1a56db" />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>緊急速報</Text>
            <Text style={styles.featureDescription}>
              気象警報や避難情報をプッシュ通知でお知らせします。
            </Text>
          </View>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="location" size={24} color="#1a56db" />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>避難所情報</Text>
            <Text style={styles.featureDescription}>
              現在地周辺の避難所情報をリアルタイムで確認できます。
            </Text>
          </View>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="cloud" size={24} color="#1a56db" />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>気象情報</Text>
            <Text style={styles.featureDescription}>
              詳細な天気予報と警報情報を提供します。
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>お問い合わせ</Text>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => handleLinkPress('https://www.osakapublic-u.ac.jp/')}
        >
          <Ionicons name="globe" size={20} color="#1a56db" />
          <Text style={styles.linkText}>大阪公立大学工業高等専門学校公式ウェブサイト</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.linkItem}
          onPress={() => handleLinkPress('mailto:support@osakapublic-u.ac.jp')}
        >
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2024 大阪公立大学工業高等専門学校</Text>
        <TouchableOpacity 
          style={styles.privacyLink}
          onPress={() => handleLinkPress('https://www.ct.omu.ac.jp/')}
        >
          <Text style={styles.privacyText}>プライバシーポリシー</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
  },
  version: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#1a56db',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  privacyLink: {
    padding: 8,
  },
  privacyText: {
    fontSize: 12,
    color: '#1a56db',
  },
}); 