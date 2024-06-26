import {Text} from 'react-native';

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
     profileMessage:'',
     
     name:'',
     age:0,
     image:'',
     levelForehand:0,
     levelBackhand:0,
     levelVolee:0,
     levelService:0,

     club:'',
     surface:'',

     challenges:{received:[], sent:[]},

     togglerUpdatedDetails:0
     
   }
   this.usernameChange = this.usernameChange.bind(this);
   this.passwordChange = this.passwordChange.bind(this);
   this.becomeAuthenticated = this.becomeAuthenticated.bind(this)
   this.setMessage = this.setMessage.bind(this)
   this.setProfileMessage = this.setProfileMessage.bind(this)

   this.resetDetails = this.resetDetails.bind(this)
   this.loadData = this.loadData.bind(this)

   this.nameChange = this.nameChange.bind(this);
   this.ageChange = this.ageChange.bind(this);
   this.imageChange = this.imageChange.bind(this);
   this.levelForehandChange = this.levelForehandChange.bind(this);
   this.levelBackhandChange = this.levelBackhandChange.bind(this);
   this.levelVoleeChange = this.levelVoleeChange.bind(this);
   this.levelServiceChange = this.levelServiceChange.bind(this);
   this.clubChange = this.clubChange.bind(this);
   this.surfaceChange = this.surfaceChange.bind(this);

   this.updateUser = this.updateUser.bind(this);

   this.togglerUpdatedDetailsChange = this.togglerUpdatedDetailsChange.bind(this);

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
setProfileMessage(profileMessage){
  this.setState({profileMessage})
}


nameChange(name){
  this.setState({name: name})
}
ageChange(age){
  this.setState({age})
}
imageChange(image){
  this.setState({image})
}
levelForehandChange(levelForehand){
  this.setState({levelForehand})
}
levelBackhandChange(levelBackhand){
  this.setState({levelBackhand})
}
levelVoleeChange(levelVolee){
  this.setState({levelVolee})
}
levelServiceChange(levelService){
  this.setState({levelService})
}
clubChange(club){
  this.setState({club})
}
surfaceChange(surface){
  this.setState({surface})
}
togglerUpdatedDetailsChange(togglerUpdatedDetails){
  this.setState({togglerUpdatedDetails: togglerUpdatedDetails})
}

resetDetails(){
  this.setState({name: '',
    age: 0,
    image: '',
    levelForehand: 0,
    levelBackhand: 0,
    levelVolee: 0,
    levelService: 0,
    club: '',
    surface:'',

    challenges: {received:[], sent:[]},

    togglerUpdatedDetails: 0
  })


}

async loadData(username){
  this.resetDetails();
  let u = await (findUser(username));
  if(u.name){
  this.nameChange(u.name);
  }
  if(u.age){
  this.ageChange(u.age);
  }
  if(u.image){

  this.imageChange(u.image);
  }
  if(u.levelForehand){
  this.levelForehandChange(u.levelForehand);
  }
  if(u.levelBackhand){
    this.levelBackhandChange(u.levelBackhand);
  }
  if(u.levelVolee){
    this.levelVoleeChange(u.levelVolee);
  }
  if(u.levelService){
    this.levelServiceChange(u.levelService);
  }
  if(u.club){
  this.clubChange(u.club);
  }
  if(u.surface){
    this.surfaceChange(u.surface);
  }

  let challenges = await (findChallenges(username));
  this.changeChallenges(challenges)
}

async updateUser(){
  await updateUserDetails(this.state.username, this.state.name, this.state.age, this.state.image, this.state.levelForehand, this.state.levelBackhand, this.state.levelVolee, this.state.levelService, this.state.club, this.state.surface)
  await this.togglerUpdatedDetailsChange(this.state.togglerUpdatedDetails +1 )
}

changeChallenges(challenges){
  this.setState({challenges: challenges})
}

async deleteChallenge(challengeIndex){

 try {
    await removeChallenge(challengeIndex);
    let challenges = await (findChallenges(this.state.username));
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
      const updatedChallenge = updatedChallenges.find(challenge => challenge.challengeIndex === challengeIndex);

      // Persist updated challenge to storage
      await updateChallenge(challengeIndex, { accepted: updatedChallenge.accepted });
    });
  } catch (error) {
    console.error('Error updating challenges:', error);
  }
}



render() {
  const { username, password, authenticated, message, profileMessage,
           name, age, image, levelForehand, levelBackhand, levelVolee, levelService, club, surface, challenges, togglerUpdatedDetails } = this.state;

  return (
    <NavigationContainer>
      {authenticated ? (
        <Tab.Navigator screenOptions={{
          tabBarShowLabel: false, 
          tabBarStyle: [{ height: 60, backgroundColor: 'white', display: 'flex'}, null] ,
          tabBarItemStyle: { justifyContent: 'center', alignItems: 'center' }, 
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
                setProfileMessage={this.setProfileMessage}
                checkUser={checkUser}
                checkUsernameAvailability={checkUsernameAvailability}
                addUser={addUser}
                loadData={this.loadData}
                setImage={this.imageChange}
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
              levelForehand={levelForehand}
              levelBackhand={levelBackhand}
              levelVolee={levelVolee}
              levelService={levelService}
              setLevelForehand={this.levelForehandChange}
              setLevelBackhand={this.levelBackhandChange}
              setLevelVolee={this.levelVoleeChange}
              setLevelService={this.levelServiceChange}
              club={club}
              setClub={this.clubChange}
              surface={surface}
              setSurface={this.surfaceChange}
              updateUser={this.updateUser}
              deleteUser={this.deleteUser}
              profileMessage={profileMessage}
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
              togglerUpdatedDetails={togglerUpdatedDetails}
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
          setProfileMessage={this.setProfileMessage}
          checkUser={checkUser}
          checkUsernameAvailability={checkUsernameAvailability}
          addUser={addUser}
          loadData={this.loadData}
          setImage={this.imageChange}
        />
      )}
    </NavigationContainer>
  );
}
}


export default App