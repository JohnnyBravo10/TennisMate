import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useWindowDimensions, Image, ScrollView } from 'react-native';

const LoginScreen = ({ username, password, setUsername, setPassword, authenticated, message, becomeAuthenticated, setMessage, setProfileMessage, checkUser, checkUsernameAvailability, addUser, loadData }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  const handleLogin = async () => {
    console.log(username, password);
    if (await checkUser(username, password) === true) {
      becomeAuthenticated(true);
      setMessage("Benvenuto " + username);
      setProfileMessage("Aggiorna le informazioni su di te")
      loadData(username);
    } else {
      setMessage("Username o password errati");
      becomeAuthenticated(false);
    }
  };

  const handleSignin = async () => {
    if (await checkUsernameAvailability(username) === true) {
      addUser(username, password);
      becomeAuthenticated(true);
      setMessage("Benvenuto " + username);
      setProfileMessage("Dicci qualcosa di te")
      loadData(username);
    } else {
      becomeAuthenticated(false);
      setMessage("Questo username è già in uso");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/logo.png')} style={[styles.logo, isSmallScreen ? styles.smallLogo : styles.bigLogo]} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, isSmallScreen ? styles.inputSmall : styles.inputLarge]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, isSmallScreen ? styles.inputSmall : styles.inputLarge]}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, isSmallScreen ? styles.buttonSmall : styles.buttonLarge]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, isSmallScreen ? styles.buttonSmall : styles.buttonLarge]}
        onPress={handleSignin}
      >
        <Text style={styles.buttonText}>Registrati come nuovo utente</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputSmall: {
    width: '80%',
  },
  inputLarge: {
    width: 300, // Larghezza massima per schermi larghi
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
  },
  buttonSmall: {
    width: '80%',
    height: 50,
    backgroundColor: 'blue',
  },
  buttonLarge: {
    width: 300, // Larghezza massima per schermi larghi
    height: 50,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    marginBottom: 20,
  },
  smallLogo: {
    width: '50%', // Adattabile in percentuale per schermi piccoli
    height: undefined,
    aspectRatio: 1, // Mantiene le proporzioni
  },
  bigLogo: {
    width: 150, // Larghezza fissa per schermi grandi
    height: 150, // Altezza fissa per schermi grandi
  },
  message:{
    fontSize: 15, fontWeight: 'bold'

  }
});

export default LoginScreen;
