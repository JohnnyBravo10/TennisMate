import * as Location from 'expo-location';

const getCurrentLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
  } catch (error) {
    //console.error('Errore durante il recupero della posizione:', error);
    return {latitude:'', longitude:''};
  }
};

export default getCurrentLocation;
