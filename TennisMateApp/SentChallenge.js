import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ChallengeButton from './ChallengeButton'


const SentChallenge = ({challenge, deleteChallenge}) => (
   <View style={styles.challengeContainer}>
       <Text style={styles.challengeText}>
           {challenge.challenged}
       </Text>
       <View style={styles.buttons}>
           <Text>{challenge.accepted ? "Accettata":"In attesa"}</Text>
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
       alignItems: 'center'
   },
   challengeText: {
       fontSize: 17
   },
   buttons: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-end',
       alignItems: 'center'
   }
})


export default SentChallenge