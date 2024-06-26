import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Button, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const backgroundImage = require('./assets/background.png')

const Profilo = ({
  name, setName, age, setAge, image, setImage, levelForehand, levelBackhand, levelVolee, levelService,
  setLevelForehand, setLevelBackhand, setLevelVolee, setLevelService, club, setClub, surface, setSurface,
  updateUser, deleteUser, profileMessage
}) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 690;
  const [modalVisible, setModalVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Richiesto accesso a rullino');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdateUser = () => {
    updateUser();

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1300);
  };

  return (
    <ImageBackground source = {backgroundImage} style={styles.backgroundImage}>
    <ScrollView>
      <Text style={styles.title}>Profilo</Text>
      <Text style={styles.message}>{profileMessage}</Text>
      <View style={[styles.form, isSmallScreen ? styles.formStretto : styles.formLargo]}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Dati</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Età</Text>
            <TextInput
              style={styles.input}
              placeholder="Età"
              value={String(age)}
              onChangeText={setAge}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.inputContainer} onPress={handleImagePicker}>
              <Text style={styles.placeholder}>Immagine profilo</Text>
              {image ? (<Image source={{ uri: image }} style={styles.image} />) : (<Image source={require('./assets/profile.png')} style={styles.image} />)}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style = {styles.inputContainer}>
          <Text style={styles.subtitle}>Abilità</Text>
          <Text style={styles.indication}> (Inserisci valori tra 1 e 10)</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Dritto</Text>
            <TextInput
              style={styles.input}
              value={String(levelForehand)}
              onChangeText={setLevelForehand}
              placeholder="Inserisci il tuo livello"
              keyboardType='numeric'
            />
            <Text style={styles.placeholder}>Rovescio</Text>
            <TextInput
              style={styles.input}
              value={String(levelBackhand)}
              onChangeText={setLevelBackhand}
              placeholder="Inserisci il tuo livello"
              keyboardType='numeric'
            />
            <Text style={styles.placeholder}>Volee</Text>
            <TextInput
              style={styles.input}
              value={String(levelVolee)}
              onChangeText={setLevelVolee}
              placeholder="Inserisci il tuo livello"
              keyboardType='numeric'
            />
            <Text style={styles.placeholder}>Servizio</Text>
            <TextInput
              style={styles.input}
              value={String(levelService)}
              onChangeText={setLevelService}
              placeholder="Inserisci il tuo livello"
              keyboardType='numeric'
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Preferenze</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Circolo preferito</Text>
            <TextInput
              style={styles.input}
              placeholder="Circolo preferito"
              value={club}
              onChangeText={setClub}
            />
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.placeholder}>Superficie preferita</Text>
            <Picker
              selectedValue={surface}
              onValueChange={setSurface}
              style={styles.picker}
            >
              <Picker.Item style={styles.option} label="Terra rossa" value="Terra rossa" />
              <Picker.Item style={styles.option} label="Cemento" value="Cemento" />
              <Picker.Item style={styles.option} label="Erba" value="Erba" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={[styles.buttonContainer, isSmallScreen ? styles.buttonContainerSmall : styles.buttonContainerLarge]}>
        <TouchableOpacity style={[styles.button, isSmallScreen ? styles.buttonSmall : styles.buttonLarge]} onPress={handleUpdateUser}>
          <Text style={styles.buttonText}>Salva modifiche</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, isSmallScreen ? styles.buttonSmall : styles.buttonLarge]} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Elimina account</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.confirmationText}>Sei sicuro di voler eliminare questo account?</Text>
            <View style={styles.modalButtonsContainer}>
              <Button
                title="Elimina"
                onPress={deleteUser}
                color="red"
              />
              <Button
                title="Annulla"
                onPress={() => setModalVisible(false)}
                color="gray"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showSuccess} animationType="slide" onRequestClose={() => setModalVisible(false)} transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalContent}>✓ Modifiche salvate</Text>
        </View>
      </Modal>

    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width:'100%'
  },
  form: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  formStretto: {
    flexDirection: 'column',
  },
  formLargo: {
    flexDirection: 'row',
  },
  section: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#ccc',
    marginHorizontal: 18,
    marginVertical: 5,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: '5%'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  placeholder: {
    marginBottom: 5,
    fontSize: 16,
    color: '#888',
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  picker: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',

  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainerSmall: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainerLarge: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'grey',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    width: 'auto', 
  },
  buttonSmall: {
    width: '80%',
    marginVertical: 5,
  },
  buttonLarge: {
    width: '35%',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 15, fontWeight: 'bold', marginLeft: '5%'
  },
  indication: {
    fontSize: 15, fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Profilo;
