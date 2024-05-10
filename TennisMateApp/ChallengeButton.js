import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'


const ChallengeButton = ({ onPress, accept, name }) => (
   <TouchableHighlight
       onPress={onPress}
       underlayColor='#efefef'
       style={styles.button}>
           <Text style={[
               styles.text,
               accept ? styles.complete : null,
               name === 'Elimina' ? styles.deleteButton : null
           ]}>
               {name}
           </Text>
       </TouchableHighlight>
)


const styles = StyleSheet.create({
   button: {
       alignSelf: 'flex-end',
       padding: 7,
       borderColor: '#ededed',
       borderWidth: 1,
       borderRadius: 4,
       marginRight: 5
   },
   text: {
       color: '#666666'
   },
   complete: {
       color: 'green',
       fontWeight: 'bold'
   },
   deleteButton: {
       color: 'rgba:(175, 47, 47, 1.0)'
   }
})


export default ChallengeButton