import AsyncStorage from '@react-native-async-storage/async-storage';

const USERs_KEY = '@users_';
const CHALLENGEs_KEY = '@challenges_1'


export const checkUser = async (username, password) => {
    let userOk= false
    console.log(userOk)
    const users = await getUsers();
    if (users.length!==0){
      users.forEach(user => {
        if (user.username === username && user.password === password){
            userOk = true;
        }
      });
    }
    return userOk
  };

  export const findUser = async (username) => {
    const users = await getUsers();
    foundUser ={};
    if (users.length!==0){
      users.forEach(user => {
        if (user.username === username){
            console.log("found user:", user)
            foundUser = user
        }
      });
    }
    return foundUser
  };

  export const findChallenges = async (username) => {
    const challenges = await getChallenges();
    receivedChallenges = [];
    sentChallenges = [];
    if (challenges.length!==0){
      challenges.forEach(challenge => {
        if (challenge.usernameChallenger === username){
            sentChallenges.push(challenge)
        }
        if (challenge.usernameChallenged === username){
          receivedChallenges.push(challenge)
      }
      });
    }
    return {received: receivedChallenges, sent: sentChallenges}
  };

  export const checkUsernameAvailability = async (username) => {
    if (username === ""){
      return false
    }
    let usernameAvailable = true
    const users = await getUsers();
    if (users.length!==0){
      users.forEach(user => {
        if (user.username === username){
          console.log("trovato doppione")
            usernameAvailable = false;
        }
      });
    }
    console.log(usernameAvailable)
    return usernameAvailable
  };

export const getUsers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERs_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error retrieving users:', error);
    return [];
  }
};

export const getSuggestedUsers = async (username) => {
  try {
    const allUsers = await getUsers();
    console.log("users da filtrare:", allUsers)
    const user = await findUser(username);
    const suggestedUsers = [];
    allUsers.forEach(otherUser => {
      if (user.username !== otherUser.username){
        if (!otherUser.level|| (user.level<= (otherUser.level +2) && user.level >= (otherUser.level -2)) ){
          suggestedUsers.push(otherUser)
        }
      }
    })
    console.log("selezionati:", suggestedUsers)
    return suggestedUsers;
  } catch (error) {
    console.error('Error retrieving suggested users:', error);
    return [];
  }
};

const getChallenges = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CHALLENGEs_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error retrieving CHALLENGES:', error);
    return [];
  }
};

export const saveUsers = async (users) => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERs_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving Users:', error);
  }
};

export const saveChallenges = async (challenges) => {
  try {
    const jsonValue = JSON.stringify(challenges);
    await AsyncStorage.setItem(CHALLENGEs_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving Challenges:', error);
  }
};

export const addUser = async (username, password) => {
  try {
    const users = await getUsers();
    users.push({username: username, password: password, image: 'assets/profile.jpg'});
    await saveUsers(users);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const addChallenge = async (usernameChallenger, usernameChallenged, dateTime, place) => {
  try {
    const challenges = await getChallenges();
    console.log("inserisco sfida a: ", usernameChallenged)
    index = 0
    challenges.forEach((challenge)=> {
      if (challenge.challengeIndex>=index){
        index = challenge.challengeIndex+1
      }
    })
    challenges.push({usernameChallenger: usernameChallenger, usernameChallenged: usernameChallenged, dateTime: dateTime, place: place, accepted: false, challengeIndex: index});
    //console.log("after pushing: ", challenges)
    await saveChallenges(challenges);
  } catch (error) {
    console.error('Error adding challenge: ', error);
  }
};

export const removeChallenge = async (challengeId) => {
  try {
    const challenges = await getChallenges();
    console.log("prima del filtraggio:", challenges)
    const updatedChallenges = challenges.filter(challenge => challenge.challengeIndex !== challengeId);
    console.log("dopo il filtraggio:", updatedChallenges)
    await saveChallenges(updatedChallenges);
  } catch (error) {
    console.error('Error removing challenge:', error);
  }
};

export const updateUserDetails = async (username, name, age, image, level, club) => {
  try {
    const users = await getUsers();
    console.log("starting updating")
    console.log(users)
    const updatedUsers = users.map(user =>
      {
      if (user.username === username){
        user.name = name
        user.age = age
        user.image = image
        user.level = level
        user.club = club
      }
      return user
      }

    );
    console.log(updatedUsers)
    await saveUsers(updatedUsers);
    console.log("updateato details")
  } catch (error) {
    console.error('Error updating Users:', error);
  }
};

export const updateChallenge = async (challengeIndex, updatedChallenge) => {
  try {
    const challenges = await getChallenges();
    console.log("challenge trovate in data: ", challenges)
    const updatedChallenges = challenges.map(challenge =>
      challenge.challengeIndex === challengeIndex ? { ...challenge, ...updatedChallenge } : challenge
    );
    console.log("challenge aggiornate in data: ", updatedChallenges)
    await saveChallenges(updatedChallenges);
  } catch (error) {
    console.error('Error updating challenge:', error);
  }
};