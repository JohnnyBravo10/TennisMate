import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords; // Ritorna le coordinate geografiche
  } catch (error) {
    console.error('Errore durante il recupero della posizione:', error);
    return null;
  }
};

export default getCurrentLocation;
