import * as React from 'react';
import {View, Text, ScrollView,  StyleSheet, useWindowDimensions} from 'react-native';

import ReceivedChallenge from './ReceivedChallenge'
import SentChallenge from './SentChallenge'



const Sfide = ({challenges, toggleAccepted, deleteChallenge}) => {

    const { width } = useWindowDimensions();
   const isSmallScreen = width < 690; 

    let receivedChallenges = challenges.received
    let sentChallenges = challenges.sent

    receivedChallenges = receivedChallenges.map((challenge) => {
        return (
            <ReceivedChallenge
                toggleAccepted={toggleAccepted}
                deleteChallenge={deleteChallenge}
                key={challenge.challengeIndex}
                challenge={challenge} />
        )
    })

    sentChallenges = sentChallenges.map((challenge) => {
        return (
            <SentChallenge
                deleteChallenge={deleteChallenge}
                key={challenge.challengeIndex}
                challenge={challenge} />
        )
    })

return (
    <ScrollView style={isSmallScreen ? styles.formStretto : styles.formLargo}>
           <View style={styles.section}>
           <Text style={styles.subtitle}>Sfide ricevute</Text>
           <View>{receivedChallenges}</View>
           </View>
           <View style={styles.section}>
           <Text style={styles.subtitle}>Sfide inviate</Text>
           <View>{sentChallenges}</View>
           </View>
       </ScrollView>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start', 
      paddingHorizontal: 20,
      paddingTop: 20, 
    },
    form: {
      justifyContent: 'space-between', 
      marginBottom: 20,
    },
  
    formStretto:{
      flexDirection: 'column',
    },
    formLargo:{
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
    option:{
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
      backgroundColor: 'blue',
      borderRadius: 5,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
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
    message:{
      fontSize: 15, fontWeight: 'bold', marginLeft: '5%'
    }
  });

export default Sfide