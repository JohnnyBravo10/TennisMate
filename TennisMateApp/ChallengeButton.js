import React from 'react'
import { Text, TouchableHighlight, StyleSheet } from 'react-native'


const ChallengeButton = ({ onPress, accept, name }) => (
   <TouchableHighlight
       onPress={onPress}
       underlayColor='#efefef'
       style={[styles.button,
        accept ? styles.buttonAccepted : null,
       ]}>
           <Text style={[
               styles.text,
               accept ? styles.complete : null,
               name === 'Elimina' ? styles.deleteButton : null
           ]}>
               {name === 'Accetta' && accept? 'Accettata':name}
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
       marginRight: 5, 
       width:'100%',
       marginVertical:5
   },
   buttonAccepted:{
    borderColor: 'green'
   },
   text: {
       color: '#666666'
   },
   complete: {
       color: 'green',
       fontWeight: 'bold'
   },
   deleteButton: {
       color: 'red',
   }
})


export default ChallengeButton