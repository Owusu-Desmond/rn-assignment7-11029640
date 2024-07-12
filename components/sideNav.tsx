import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';

interface SideNavProps {
  visible: boolean;
  onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.sideNav}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name='close' color='red' />
        </TouchableOpacity>
        <Text style={styles.navItem}>Home</Text>
        <Text style={styles.navItem}>Shop</Text>
        <Text style={styles.navItem}>Cart</Text>
        <Text style={styles.navItem}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 45,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  sideNav: {
    width: 250,
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  navItem: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default SideNav;
