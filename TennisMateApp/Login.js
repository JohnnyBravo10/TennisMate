import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute} from '@react-navigation/native';


const LoginScreen = ({ username, password, setUsername, setPassword }) => {

const handleLogin = () => {

};

const handleSignin = () => {
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
</View>
);};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
input: { width: '80%', height: 50, borderWidth: 1, borderColor: '#ccc',
borderRadius: 5, marginBottom: 10, paddingHorizontal: 10,
},
button: { width: '80%', height: 50, backgroundColor: 'blue',
justifyContent: 'center', alignItems: 'center', borderRadius: 5,
},
buttonText: {
color: 'white',
fontSize: 18,
fontWeight: 'bold',
},
});

export default LoginScreen;