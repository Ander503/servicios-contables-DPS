import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Empleado from './components/Empleado';

export default function App() {
  return (
    
    <View style={styles.container}>
      <Empleado></Empleado>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#cdcbf0',
    
  },
});
