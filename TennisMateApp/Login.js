import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { checkUsernameAvailability } from './data';


const LoginScreen = ({ username, password, setUsername, setPassword, authenticated, message, becomeAuthenticated, setMessage, checkUser, checkUsernameAvailability, addUser, loadData}) => {

const handleLogin = async () => {
    console.log (username, password)
    if(await checkUser(username, password) === true){
        becomeAuthenticated(true)
        setMessage("Benvenuto "+ username)
        loadData(username)
    }
    else{
        setMessage("Username o password errati")
        becomeAuthenticated(false)
    }

};

const handleSignin = async () => {
    if (await checkUsernameAvailability(username) === true){
        addUser(username, password)
        becomeAuthenticated(true)
        setMessage("Benvenuto " + username)
        loadData(username)
    } 
    else{
        becomeAuthenticated(false)
        setMessage("Questo username è già in uso")
    }
};

return (
<View style={styles.container}>
<Text style={styles.title}>Login</Text>
<TextInput style={styles.input}
placeholder="Username"
value={username} onChangeText={setUsername}
/>
<TextInput style={styles.input}
placeholder="Password"
secureTextEntry={true}
value={password} onChangeText={setPassword}
/>
<TouchableOpacity style={styles.button} onPress={handleLogin}>
<Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleSignin}>
<Text style={styles.buttonText}>Registrati come nuovo utente</Text>
</TouchableOpacity>
<Text>{message}</Text>
</View>
);};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
input: { width: '80%', height: 50, borderWidth: 1, borderColor: '#ccc',
borderRadius: 5, marginBottom: 10, paddingHorizontal: 10,
},
button: { width: '80%', height: 50, backgroundColor: 'blue',
justifyContent: 'center', alignItems: 'center', borderRadius: 5, margin: 5,
},
buttonText: {
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
});

export default LoginScreen;