import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EmergencyItem = {
  id: string;
  name: string;
  quantity: number;
  expiryDate?: string;
  category: 'food' | 'medical' | 'tools' | 'documents' | 'other';
  isChecked: boolean;
};

export default function EmergencyKitScreen() {
  const [items, setItems] = useState<EmergencyItem[]>([]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '1',
    expiryDate: '',
    category: 'other' as EmergencyItem['category'],
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('emergencyItems');
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error('アイテムの読み込みに失敗しました:', error);
    }
  };

  const saveItems = async (newItems: EmergencyItem[]) => {
    try {
      await AsyncStorage.setItem('emergencyItems', JSON.stringify(newItems));
    } catch (error) {
      console.error('アイテムの保存に失敗しました:', error);
    }
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      Alert.alert('エラー', 'アイテム名を入力してください');
      return;
    }

    const newId = Date.now().toString();
    const updatedItems = [...items, {
      id: newId,
      name: newItem.name,
      quantity: parseInt(newItem.quantity) || 1,
      expiryDate: newItem.expiryDate,
      category: newItem.category,
      isChecked: true,
    }];

    setItems(updatedItems);
    saveItems(updatedItems);

    setNewItem({
      name: '',
      quantity: '1',
      expiryDate: '',
      category: 'other',
    });
    setIsAddModalVisible(false);
  };

  const toggleItemCheck = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      '削除の確認',
      'このアイテムを削除してもよろしいですか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: '削除',
          style: 'destructive',
          onPress: () => {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
            saveItems(updatedItems);
          }
        }
      ]
    );
  };

  const getCategoryIcon = (category: EmergencyItem['category']) => {
    switch (category) {
      case 'food': return 'restaurant';
      case 'medical': return 'medical';
      case 'tools': return 'build';
      case 'documents': return 'document';
      default: return 'cube';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {['food', 'medical', 'tools', 'documents', 'other'].map(category => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <View key={category} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {category === 'food' && '食料・飲料'}
                {category === 'medical' && '医療・衛生用品'}
                {category === 'tools' && '工具・機材'}
                {category === 'documents' && '重要書類'}
                {category === 'other' && 'その他'}
              </Text>
              {categoryItems.map(item => (
                <View key={item.id} style={styles.itemCard}>
                  <TouchableOpacity
                    style={styles.checkBox}
                    onPress={() => toggleItemCheck(item.id)}
                  >
                    <Ionicons
                      name={item.isChecked ? 'checkbox' : 'square-outline'}
                      size={24}
                      color={item.isChecked ? '#1a56db' : '#9ca3af'}
                    />
                  </TouchableOpacity>
                  
                  <View style={styles.itemContent}>
                    <Text style={[
                      styles.itemName,
                      !item.isChecked && styles.itemNameUnchecked
                    ]}>
                      {item.name}
                    </Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemQuantity}>数量: {item.quantity}</Text>
                      {item.expiryDate && (
                        <Text style={styles.itemExpiry}>
                          期限: {item.expiryDate}
                        </Text>
                      )}
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteItem(item.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>新しいアイテムを追加</Text>
              <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>アイテム名</Text>
              <TextInput
                style={styles.input}
                value={newItem.name}
                onChangeText={text => setNewItem(prev => ({ ...prev, name: text }))}
                placeholder="アイテム名を入力"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>数量</Text>
              <TextInput
                style={styles.input}
                value={newItem.quantity}
                onChangeText={text => setNewItem(prev => ({ ...prev, quantity: text }))}
                keyboardType="numeric"
                placeholder="数量を入力"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>期限（任意）</Text>
              <TextInput
                style={styles.input}
                value={newItem.expiryDate}
                onChangeText={text => setNewItem(prev => ({ ...prev, expiryDate: text }))}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>カテゴリー</Text>
              <View style={styles.categoryButtons}>
                {[
                  { id: 'food', label: '食料・飲料' },
                  { id: 'medical', label: '医療・衛生用品' },
                  { id: 'tools', label: '工具・機材' },
                  { id: 'documents', label: '重要書類' },
                  { id: 'other', label: 'その他' },
                ].map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryButton,
                      newItem.category === cat.id && styles.categoryButtonSelected
                    ]}
                    onPress={() => setNewItem(prev => ({ 
                      ...prev, 
                      category: cat.id as EmergencyItem['category']
                    }))}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      newItem.category === cat.id && styles.categoryButtonTextSelected
                    ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.addItemButton}
              onPress={handleAddItem}
            >
              <Text style={styles.addItemButtonText}>追加</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  section: {
    marginTop: 16,
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  checkBox: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  itemNameUnchecked: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  itemDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6b7280',
  },
  itemExpiry: {
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#1a56db',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  categoryButtonSelected: {
    backgroundColor: '#1a56db',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#374151',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
  addItemButton: {
    backgroundColor: '#1a56db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addItemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 