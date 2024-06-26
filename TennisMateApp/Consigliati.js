import React, { useState, useEffect } from 'react';
import {Text, View, Image, StyleSheet, ScrollView, Modal, Button, TextInput, TouchableOpacity, Linking, ImageBackground} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';

const backgroundImage = require('./assets/background.png')

const Consigliati = ({username, getSuggestedUsers, addChallenge, findChallenges, changeChallenges, togglerUpdatedDetails}) => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [proposedPlace, setProposedPlace] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedUser, setSelectedUser] = useState(null);

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
    }, [username, getSuggestedUsers, togglerUpdatedDetails]); 

    const handleChallengePress = (user) => {
        setSelectedUser(user);
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

    const openLink = (clubName) => {
      const url = `https://www.google.com/maps/search/${clubName.replace(/ /g, '+')}`;
      Linking.openURL(url).catch((err) => console.error('Errore durante l\'apertura del link:', err));
  };

    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <ScrollView>
          <Text style={styles.title}>Utenti consigliati</Text>
            {suggestedUsers.map((user, index) => (
                <View key={index} style={styles.suggestedContainer}>
                  <View style={styles.field}>
                    <Text style={styles.placeholder}>Nome</Text>
                    <Text style={styles.text}>{user.name}</Text>
                    </View>
                    <View style={styles.field}>
                    <Text style={styles.placeholder}>Età</Text>
                    <Text>{user.age}</Text>
                    </View>
                    <View style={styles.field}>
                    <Text style={styles.placeholder}>Livello medio</Text>
                    <Text>{user.level}</Text>
                    </View>
                    <View style={styles.field}>
                    <View style={styles.inlineContainer}>                        
                      <Text style={styles.placeholder}>Circolo preferito</Text>
                      <TouchableOpacity onPress={() => openLink(user.club)}>
                        <Text style={styles.link}>Vedi su mappa</Text>
                      </TouchableOpacity>
                      </View>
                    <Text style={styles.text}>{user.club}</Text>
                    </View>
                        
                    <View style={styles.field}>
                    <Text style={styles.placeholder}>Superficie preferita</Text>
                    <Text>{user.surface}</Text>
                    {user.image ? (<Image source={{ uri: user.image }} style={styles.image} />) : (<Image source={require('./assets/profile.png')} style={styles.image} />)}
                    </View>

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
                          placeholder="Luogo"
                          value={proposedPlace}
                          onChangeText={(params) => setProposedPlace(params)}
                        />

                        <DateTimePicker
                          mode="single"
                          date={date}
                          timePicker={true}
                          onChange={(params) => setDate(new Date(params.date))}
                        />
                      <View style={styles.modalButtonsContainer}>
                        <Button
                          title="Invia sfida"
                          onPress={handleSendChallenge}
                        />
                        <Button
                          title="Annulla"
                          onPress={() => setModalVisible(false)}
                          color="gray"
                        />
                        </View>
                      </View>
                    </Modal>
                </View>
            ))}
        </ScrollView>
        </ImageBackground>
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
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    placeholder: {
      fontSize: 16,
      color: '#888',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width:'100%'
    },
    input: {
      width: '70%',
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
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      marginLeft: '5%'
    },
    field:{
      marginVertical: 3
    },
    suggestedContainer:{
      flexDirection: 'column',
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      borderWidth: 3,
      borderColor: '#ccc',
      marginHorizontal: 18,
      marginVertical: 5
    },
    button: {
      alignSelf: 'flex-end',
      padding: 7,
      borderColor: '#ededed',
      borderWidth: 1,
      borderRadius: 4,
      marginRight: 5
    },
    inlineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    link: {
      marginLeft: 10,
      color: 'blue',
      textDecorationLine: 'underline',
    },
    text: {
      flexWrap: 'wrap',
    },

    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
});

export default Consigliati;
