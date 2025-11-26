import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { colors, spacing, radii } from '@/constants/theme';

interface DropdownProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  selectedValue: T;
  labelExtractor: (item: T) => string;
}

export const Dropdown = <T,>({
  items,
  onSelect,
  selectedValue,
  labelExtractor,
}: DropdownProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: T) => {
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue ? labelExtractor(selectedValue) : 'Select...'}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.modalItemText}>{labelExtractor(item)}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md - 4,
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.graySoft,
    minWidth: 200,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  dropdownIcon: {
    fontSize: 12,
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: radii.sm,
    padding: spacing.sm + 2,
    width: '80%',
    maxHeight: '60%',
  },
  modalItem: {
    padding: spacing.md - 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.graySoft,
  },
  modalItemText: {
    fontSize: 16,
    color: colors.text,
  },
});
