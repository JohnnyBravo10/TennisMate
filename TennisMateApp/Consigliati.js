import React, { useState, useEffect } from 'react';
import {Text, View, Image, StyleSheet, ScrollView, Modal, Button, TextInput} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

const Consigliati = ({username, getSuggestedUsers, addChallenge, findChallenges, changeChallenges}) => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [proposedPlace, setProposedPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedUser, setSelectedUser] = useState(null); // Stato per l'utente selezionato

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

    const handleChallengePress = (user) => {
        setSelectedUser(user); // Imposta l'utente selezionato
        setModalVisible(true);
    };

    const handleSendChallenge = async () => {
        if (selectedUser) {
            await addChallenge(username, selectedUser.username, date, proposedPlace);
            await changeChallenges(await findChallenges(username));
            setModalVisible(false);
            setProposedPlace('');
            setDate(new Date());
            setSelectedUser(null);
        }
    };

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
                      onPress={() => handleChallengePress(user)}
                    />
                    <Modal
                      visible={modalVisible}
                      animationType="slide"
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="Place"
                          value={proposedPlace}
                          onChangeText={(params) => setProposedPlace(params)}
                        />

                        <DateTimePicker
                          mode="single"
                          date={date}
                          timePicker={true}
                          onChange={(params) => setDate(new Date(params.date))}
                        />

                        <Button
                          title="Invia sfida"
                          onPress={handleSendChallenge}
                        />
                        <Button
                          title="Annulla"
                          onPress={() => setModalVisible(false)}
                        />
                      </View>
                    </Modal>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      flexDirection: 'column',
      marginBottom: 20,
      borderWidth: 1,
      padding: 10,
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

export default Consigliati;
