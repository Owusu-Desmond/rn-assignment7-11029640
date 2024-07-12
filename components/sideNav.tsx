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
        <View>
          <Text style={{ fontSize: 20}}>Owusu Desmond</Text>
          <View style={{ borderWidth: 1, borderColor: '#dc8460', width: 140, marginTop: 10, marginLeft: 10}}/>
        </View>
        <Text style={styles.navItem}>Store</Text>
        <Text style={styles.navItem}>Locations</Text>
        <Text style={styles.navItem}>Blog</Text>
        <Text style={styles.navItem}>Jewelery</Text>
        <Text style={styles.navItem}>Electronic</Text>
        <Text style={styles.navItem}>Clothing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  sideNav: {
    display: 'flex',
    gap: 30,
    width: 250,
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  navItem: {
    marginVertical: 10,
    fontSize: 18,
  },
});

export default SideNav;
