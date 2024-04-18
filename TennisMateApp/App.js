import {Text, Button, View, StyleSheet, ScrollView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './Login'

import Profilo from './Profilo';
import Consigliati from './Consigliati';
import Chat from './Chat';
import Sfide from './Sfide'

import React, { Component } from 'react';
import { checkUser} from './data';

const Tab = createBottomTabNavigator();
let todoIndex = 0


class App extends Component {
 constructor(){
   super()
   this.state = {
     username:'',
     password:''
   }
   this.usernameChange = this.usernameChange.bind(this);
   this.passwordChange = this.passwordChange.bind(this);
 }


usernameChange(username){
  console.log("ok")
  console.log(username)
  this.setState({username})
  console.log(this.state)
}

passwordChange(password){
  this.setState({password})
}


 render(){
   const { username, password } = this.state
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
              />
            )}
            </Tab.Screen>


<Tab.Screen name="👤​" component={Profilo} options={{
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>, 
          }}/>
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