import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ChallengeButton from './ChallengeButton'



const ReceivedChallenge = ({challenge, toggleAccepted, deleteChallenge}) => (
   <View style={styles.challengeContainer}>
       <View>
       <Text style={styles.challengeText} >
       👤{challenge.usernameChallenger}
       </Text>
       <Text style={styles.challengeText}>
       📍{challenge.place}
       </Text>
       <Text style={styles.challengeText}>
       📅 {String(new Date(challenge.dateTime).getDate()).padStart(2, '0')}/{String(new Date(challenge.dateTime).getMonth() + 1).padStart(2, '0')}/{new Date(challenge.dateTime).getFullYear()} 
       </Text>
       <Text>
       🕣 {String(new Date(challenge.dateTime).getHours()).padStart(2, '0')}:{String(new Date(challenge.dateTime).getMinutes()).padStart(2, '0')}
       </Text>
       </View>
       <View style={styles.buttons}>
           <ChallengeButton
               name='Accetta'
               accept={(challenge.accepted)}
               onPress={() => toggleAccepted(challenge.challengeIndex)} />
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
       fontSize: 17
   },
   buttons: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'center',
       flexWrap: 'wrap'
   }
})


export default ReceivedChallenge