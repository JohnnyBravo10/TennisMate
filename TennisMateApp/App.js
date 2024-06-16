import {Text, Button, View, StyleSheet, ScrollView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './Login'

import Profilo from './Profilo';
import Consigliati from './Consigliati';
import Sfide from './Sfide'

import React, { Component } from 'react';
import {checkUser, checkUsernameAvailability, addUser, findUser, updateUserDetails, findChallenges, removeChallenge, removeUser, getSuggestedUsers, addChallenge, updateChallenge} from './data';

const Tab = createBottomTabNavigator();

class App extends Component {
 constructor(){
   super()
   this.state = {
     username:'',
     password:'',
     authenticated: false,
     message:'Autenticarsi o registrare un nuovo utente',
     
     name:'',
     age:0,
     image:'',
     level:0,
     club:'',

     challenges:{received:[], sent:[]},
     
   }
   this.usernameChange = this.usernameChange.bind(this);
   this.passwordChange = this.passwordChange.bind(this);
   this.becomeAuthenticated = this.becomeAuthenticated.bind(this)
   this.setMessage = this.setMessage.bind(this)

   this.resetDetails = this.resetDetails.bind(this)
   this.loadData = this.loadData.bind(this)

   this.nameChange = this.nameChange.bind(this);
   this.ageChange = this.ageChange.bind(this);
   this.imageChange = this.imageChange.bind(this);
   this.levelChange = this.levelChange.bind(this);
   this.clubChange = this.clubChange.bind(this);

   this.updateUser = this.updateUser.bind(this);

   this.changeChallenges = this.changeChallenges.bind(this)
   this.toggleAccepted = this.toggleAccepted.bind(this)
   this.deleteChallenge = this.deleteChallenge.bind(this)
   this.deleteUser = this.deleteUser.bind(this)
 }


usernameChange(username){
  this.setState({username: username})
}
passwordChange(password){
  this.setState({password})
}
becomeAuthenticated(authenticated){
  this.setState({authenticated})
}
setMessage(message){
  this.setState({message})
}


nameChange(name){
  console.log("inizio name change")
  console.log(this.state.name)
  this.setState({name: name})
  console.log(this.state.name)
  console.log("fine name change")
}
ageChange(age){
  this.setState({age})
}
imageChange(image){
  this.setState({image})
}
levelChange(level){
  this.setState({level})
}
clubChange(club){
  this.setState({club})
}

resetDetails(){
  console.log("starting reset")
  this.setState({name: '',
    age: 0,
    image: '',
    level: 0,
    club: '',

    challenges: {received:[], sent:[]},
  })

  console.log(this.state.name)
  console.log("terminato reset")

}

async loadData(username){
  this.resetDetails();
  user = await (findUser(username));
  if(user.name){
  this.nameChange(user.name);
  }
  if(user.age){
  this.ageChange(user.age);
  }
  if(user.image){
  this.imageChange(user.image);
  }
  if(user.level){
  this.levelChange(user.level);
  }
  if(user.club){
  this.clubChange(user.club);
  }

  challenges = await (findChallenges(username));
  console.log("sfide trovate:", challenges)
  this.changeChallenges(challenges)

  console.log(this.state)
}

updateUser(){
  updateUserDetails(this.state.username, this.state.name, this.state.age, this.state.image, this.state.level, this.state.club)
}

changeChallenges(challenges){
  this.setState({challenges: challenges})
}

async deleteChallenge(challengeIndex){
  //let { challenges } = this.state
  //received = challenges.received.filter((challenge) => challenge.challengeIndex !== challengeIndex)
  //sent = challenges.sent.filter((challenge) => challenge.challengeIndex !== challengeIndex)
  //this.setState({ challenges: {received: received, sent: sent} })

 try {
    await removeChallenge(challengeIndex);
    challenges = await (findChallenges(this.state.username));
    console.log("sfide trovate:", challenges)
    this.changeChallenges(challenges)
 } catch (error) {
    console.error('Error deleting challenge:', error);
 }   
}

async deleteUser(){

 try {
    await removeUser(this.state.username);
    this.usernameChange('')
    this.passwordChange('')
    this.becomeAuthenticated(false);
    this.setMessage("Autenticarsi o registrare un nuovo utente")
 } catch (error) {
    console.error('Error deleting challenge:', error);
 }   
}

/*
async toggleAccepted(challengeIndex) {
  try {
    const receivedChallenges = this.state.challenges.received;
    const updatedChallenges = receivedChallenges.map(challenge => {
      if (challenge.challengeIndex === challengeIndex) {
        // Toggle the 'complete' property
        return { ...challenge, accepted: !challenge.accepted };
      }
      return challenge;
    });

    this.setState({ received: updatedChallenges, sent: this.state.challenges.sent });

    console.log("prima: ", receivedChallenges)
    console.log("aggiornate: ", updatedChallenges)
  

    console.log("nuovo stato: ", !receivedChallenges.find(challenge => challenge.challengeIndex === challengeIndex).accepted)

    // Persist updated TODOs to storage
    await updateChallenge(challengeIndex, { accepted: !receivedChallenges.find(challenge => challenge.challengeIndex === challengeIndex).accepted });
  } catch (error) {
    console.error('Error updating challenges:', error);
  }
}*/

async toggleAccepted(challengeIndex) {
  try {
    const receivedChallenges = this.state.challenges.received;
    const updatedChallenges = receivedChallenges.map(challenge => {
      if (challenge.challengeIndex === challengeIndex) {
        // Toggle the 'accepted' property
        return { ...challenge, accepted: !challenge.accepted };
      }
      return challenge;
    });

    this.setState({ 
      challenges: {
        received: updatedChallenges, 
        sent: this.state.challenges.sent 
      }
    }, async () => {
      // Calcola il nuovo valore 'accepted' dopo l'aggiornamento dello stato
      const updatedChallenge = updatedChallenges.find(challenge => challenge.challengeIndex === challengeIndex);
      console.log("prima: ", receivedChallenges);
      console.log("aggiornate: ", updatedChallenges);
      console.log("nuovo stato: ", updatedChallenge.accepted);

      // Persist updated challenge to storage
      await updateChallenge(challengeIndex, { accepted: updatedChallenge.accepted });
    });
  } catch (error) {
    console.error('Error updating challenges:', error);
  }
}



render() {
  const { username, password, authenticated, message,
           name, age, image, level, club, challenges } = this.state;

  console.log("challenges in state: ", challenges);

  return (
    <NavigationContainer>
      {authenticated ? (
        <Tab.Navigator tabBarOptions={{
          showLabel: false, 
          style: { height: 60, backgroundColor: 'white' }, 
          tabStyle: { justifyContent: 'center', alignItems: 'center' }, 
        }}>
          <Tab.Screen name="📲​​"
            options={{tabBarIcon: () => <Text style={{ fontSize: 24 }}>📲​</Text>}}>
              {(props) => (
              <LoginScreen
                {...props}
                username={username}
                password={password}
                setUsername={this.usernameChange}
                setPassword={this.passwordChange}
                authenticated={authenticated}
                message={message}
                becomeAuthenticated={this.becomeAuthenticated}
                setMessage={this.setMessage}
                checkUser={checkUser}
                checkUsernameAvailability={checkUsernameAvailability}
                addUser={addUser}
                loadData={this.loadData}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="👤​" 
            options={{tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>}}>
            {(props) => (
            <Profilo
              {...props}
              name={name}
              age={age}
              setName={this.nameChange}
              setAge={this.ageChange}
              image={image}
              setImage={this.imageChange}
              level={level}
              setLevel={this.levelChange}
              club={club}
              setClub={this.clubChange}
              updateUser={this.updateUser}
              deleteUser={this.deleteUser}
            />
          )}
          </Tab.Screen>

          <Tab.Screen name="🎾​​​"
            options={{tabBarIcon: () => <Text style={{ fontSize: 24 }}>🎾​​</Text>}}>
            {(props) => (
            <Sfide
              {...props}
              challenges={challenges}
              toggleAccepted={this.toggleAccepted}
              deleteChallenge={this.deleteChallenge}
            />
          )}
          </Tab.Screen>

          <Tab.Screen name="👥​​​"
            options={{tabBarIcon: () => <Text style={{ fontSize: 24 }}>👥​​</Text>}}>
            {(props) => (
            <Consigliati
              {...props}
              username={username}
              getSuggestedUsers={getSuggestedUsers}
              addChallenge={addChallenge}
              findChallenges={findChallenges}
              changeChallenges={this.changeChallenges}
            />
          )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <LoginScreen
          username={username}
          password={password}
          setUsername={this.usernameChange}
          setPassword={this.passwordChange}
          authenticated={authenticated}
          message={message}
          becomeAuthenticated={this.becomeAuthenticated}
          setMessage={this.setMessage}
          checkUser={checkUser}
          checkUsernameAvailability={checkUsernameAvailability}
          addUser={addUser}
          loadData={this.loadData}
        />
      )}
    </NavigationContainer>
  );
}
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f5f5f5',
 },
 content: {
   flex: 1,
   paddingTop: 60
 }
})


export default App