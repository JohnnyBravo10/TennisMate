import {Text, Button, View, StyleSheet, ScrollView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './Login'

import Profilo from './Profilo';
import Consigliati from './Consigliati';
import Chat from './Chat';
import Sfide from './Sfide'

import React, { Component } from 'react';
import {checkUser, checkUsernameAvailability, addUser, findUser, updateUserDetails} from './data';

const Tab = createBottomTabNavigator();
let todoIndex = 0


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
    club: ''
  })

  console.log(this.state.name)
  console.log("terminato reset")

}

async loadData(username){
  this.resetDetails();
  user = await (findUser(username));
  console.log("user: ", user)
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
  console.log(this.state)
}

updateUser(){
updateUserDetails(this.state.username, this.state.name, this.state.age, this.state.image, this.state.level, this.state.club)
}

 render(){

   const { username, password, authenticated, message,
            name, age, image, level, club} = this.state


   return(
   <NavigationContainer>
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
                checkUser = {checkUser}
                checkUsernameAvailability = {checkUsernameAvailability}
                addUser = {addUser}
                loadData = {this.loadData}
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
                image = {image}
                setImage = {this.imageChange}
                level={level}
                setLevel={this.levelChange}
                club = {club}
                setClub = {this.clubChange}
                updateUser = {this.updateUser}
            />
          )}
          </Tab.Screen>

<Tab.Screen name="💬​​" component={Chat} options={{
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>💬</Text>, 
          }}/>
<Tab.Screen name="🎾​​​" component={Sfide} options={{
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>🎾​​</Text>, 
          }}/>
<Tab.Screen name="👥​" component={Consigliati} options={{
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>👥</Text>, 
          }}/>

</Tab.Navigator>
</NavigationContainer>
   )
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