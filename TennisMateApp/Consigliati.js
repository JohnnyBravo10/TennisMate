import React, { useState, useEffect } from 'react';
import {Text, View, Image, StyleSheet, ScrollView, Modal, Button, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Consigliati = ({username, getSuggestedUsers, addChallenge}) => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [proposedPlace, setProposedPlace] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());


    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const users = await getSuggestedUsers(username); 
                setSuggestedUsers(users); 
            } catch (error) {
                console.error('Errore durante il recupero degli utenti suggeriti:', error);
            }
        };

        fetchSuggestedUsers(); 
    }, [username, getSuggestedUsers]); 

    console.log("suggerimenti da rappresentare:", suggestedUsers)


    return (
        <ScrollView>
            {suggestedUsers.map((user, index) => (
                <View key={index} style={styles.suggestedContainer}>
                    <Text style={styles.placeholder}>Nome</Text>
                    <Text>{user.name}</Text>
                    <Text style={styles.placeholder}>Età</Text>
                    <Text>{user.age}</Text>
                    <Text style={styles.placeholder}>Livello</Text>
                    <Text>{user.level}</Text>
                    <Text style={styles.placeholder}>Circolo preferito</Text>
                    <Text>{user.club}</Text>
                    <Image source={{ uri: user.image }} style={styles.image} />

                    <Button 
                      style={styles.button}
                      title="Sfida"
                      onPress={() => setModalVisible(true)}
                    />
                    <Modal
                      visible={modalVisible}
                      animationType="slide"
                      //transparent={true}
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <View>
                      <View style={styles.inputContainer}>

                      <TextInput
                        style={styles.input}
                        placeholder="Place"

                        value={proposedPlace}
                        onChangeText={setProposedPlace}
                      />
                      <DateTimePicker
                        value={selectedDate}
                        mode="datetime"
                        is24Hour={true}
                        display="default"
                        onChange={setSelectedDate}
                      />

                      <Button
                        title="Invia sfida"
                        onPress={() => setModalVisible(false)}
                      />
                      <Button
                        title="Annulla"
                        onPress={() => setModalVisible(false)}
                      />
                      </View>
                      </View>
                    </Modal>
                </View>
            ))}
        </ScrollView>
    );
};

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
    suggestedContainer:{
      flexDirection: 'column', // Imposta la disposizione verticale
      marginBottom: 20, // Spazio inferiore tra i contenitori suggeriti
      borderWidth: 1, // Opzionale: aggiunge un bordo per visualizzare il contenitore
      padding: 10, // Opzionale: aggiunge spazio interno al contenitore
    },

    button: {
      alignSelf: 'flex-end',
      padding: 7,
      borderColor: '#ededed',
      borderWidth: 1,
      borderRadius: 4,
      marginRight: 5
  },
  });

export default Consigliati