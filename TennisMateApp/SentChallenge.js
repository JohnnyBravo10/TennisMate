import React from 'react'
import { View, Text, StyleSheet, Image, Linking } from 'react-native'
import ChallengeButton from './ChallengeButton'

import getCurrentLocation from './getCurrentPosition'

const goTo = async (clubName) => {
    console.log("calcoliamo il percorso")
    position = await getCurrentLocation()
    console.log("posizione", position)
    //console.log("latitudde", position.coords.latitude)
    const url = `https://www.google.com/maps/dir/${position.latitude},${position.longitude}/${clubName.replace(/ /g, '+')}`;
    console.log(url)
    Linking.openURL(url).catch((err) => console.error('Errore durante l\'apertura del link:', err));
};


const SentChallenge = ({challenge, deleteChallenge}) => (
   <View style={styles.challengeContainer}>
    <View style={styles.challengeData}>
    <Text style={styles.challengeText}> 
        👤  {challenge.usernameChallenged}
       </Text>
       <Text style={styles.challengeText}>
       📍   {challenge.place}
       </Text>
       <Text style={styles.challengeText}>
       📅   {String(new Date(challenge.dateTime).getDate()).padStart(2, '0')}/{String(new Date(challenge.dateTime).getMonth() + 1).padStart(2, '0')}/{new Date(challenge.dateTime).getFullYear()} 
       </Text>
       <Text style={styles.challengeText}>
       🕣   {String(new Date(challenge.dateTime).getHours()).padStart(2, '0')}:{String(new Date(challenge.dateTime).getMinutes()).padStart(2, '0')}
       </Text>
       </View>
       <View style={styles.buttons}>
           <Text style={styles.statusChallenge}>{challenge.accepted ? "Accettata!":"In attesa"}</Text>
           <ChallengeButton
               name='Vai'
               onPress={() => goTo(challenge.place)} />
           <ChallengeButton
               name='Elimina'
               onPress={ () => deleteChallenge(challenge.challengeIndex)} />
       </View>
   </View>
)


const styles = StyleSheet.create({
   challengeContainer: {
       marginLeft: 20,
       marginRight: 20,
       backgroundColor: '#ffffff',
       borderTopWidth: 1,
       borderRightWidth: 1,
       borderLeftWidth: 1,
       borderColor: '#ededed',
       paddingLeft: 14,
       paddingTop: 7,
       paddingBottom: 7,
       shadowOpacity: 0.2,
       shadowRadius: 3,
       shadowColor: '#000000',
       shadowOffset: { width: 2, height: 2},
       flexDirection: 'row',
       alignItems: 'center',
       flexWrap: 'wrap',
   },
   challengeText: {
       fontSize: 17,
       flexWrap: 'wrap',
       flex: 1,
        marginLeft: 5,
   },

   challengeData:{
    flex: 2,

   },

   statusChallenge: {
    alignSelf: 'flex-end',
    padding: 7,
    borderColor: '#ededed',
    borderWidth: 0,
    borderRadius: 4,
    marginRight: 5,
    fontSize: 12
},
   buttons: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'center',
       flexWrap: 'wrap',
   },


})


export default SentChallenge