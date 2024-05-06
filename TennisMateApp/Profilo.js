import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import NumericInput from 'react-native-numeric-input';
import { Ionicons } from '@expo/vector-icons';

const Profilo = ({name, setName, age, setAge, image, setImage, level, setLevel, club, setClub, updateUser}) => {

 const handleImagePicker = async () => {
  console.log("beginning");
  console.log(image.uri)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Richiesto accesso a rullino');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      console.log("entrato nel secondo if")
      console.log(result);
      console.log(result.assets[0].uri)
      setImage(result.assets[0].uri);
    }
    console.log("end");
    console.log(image.uri)
  };

return (
<View>
  <Text style={styles.title}>Profilo</Text>
  <View style={styles.form}>
    <View style={styles.container}>
      <Text style={styles.subtitle}>Dati</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Età"
          value={age}
          onChangeText={setAge}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.inputContainer} onPress={handleImagePicker}>
          <Text style={styles.placeholder}>Image</Text>
            {image ? (<Image source={{ uri: image }} style={styles.image} />) : (<Text style={styles.placeholder}>Select an Image</Text>)}
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.container}>
      <Text style={styles.subtitle}>Abilità</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Livello (da 1 a 10)</Text>
        <TextInput
        style={styles.input}
        value={level}
        onChangeText={setLevel}
        placeholder="Inserisci il tuo livello"
        keyboardType='numeric'
      />
        
      </View>
    </View>

    <View style={styles.container}>
      <Text style={styles.subtitle}>Preferenze</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>circolo</Text>
        <TextInput
          style={styles.input}
          placeholder="Circolo preferito"
          value={club}
          onChangeText={setClub}
        />
      </View>
    </View>
  </View>
<TouchableOpacity style={styles.button} onPress={updateUser}>
  <Text style={styles.buttonText}>Salva modifiche</Text>
</TouchableOpacity>
</View>
);};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row', // Organizza i contenitori in orizzontale
    justifyContent: 'space-between', // Spazio uniforme tra i contenitori
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1
  },
  inputContainer: {
    marginBottom: 20,
  },
  placeholder: {
    marginBottom: 5,
    fontSize: 16,
    color: '#888',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default Profilo