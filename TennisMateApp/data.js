import AsyncStorage from '@react-native-async-storage/async-storage';

const USERs_KEY = '@users_';
const CHALLENGEs_KEY = '@challenges_1'


export const checkUser = async (username, password) => {
    let userOk= false
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
            foundUser = user
        }
      });
    }
    return foundUser
  };

  export const getProfilePicture = async (username) =>{
    const user = findUser(username);
    return user.image
    
  }

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

            usernameAvailable = false;
        }
      });
    }
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
  
    const user = await findUser(username);
    const suggestedUsers = [];
    allUsers.forEach(otherUser => {
      if (user.username !== otherUser.username){
        if (!otherUser.level|| (user.level<= (otherUser.level +2) && user.level >= (otherUser.level -2)) || (user.age<= (otherUser.age * 1.25) && user.age >= (otherUser.age * 0.75)) ){
          suggestedUsers.push(otherUser)
        }
      }
    })
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
    users.push({username: username, password: password});
    await saveUsers(users);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const addChallenge = async (usernameChallenger, usernameChallenged, dateTime, place) => {
  try {
    const challenges = await getChallenges();
    index = 0
    challenges.forEach((challenge)=> {
      if (challenge.challengeIndex>=index){
        index = challenge.challengeIndex+1
      }
    })
    challenges.push({usernameChallenger: usernameChallenger, usernameChallenged: usernameChallenged, dateTime: dateTime, place: place, accepted: false, challengeIndex: index});
    await saveChallenges(challenges);
  } catch (error) {
    console.error('Error adding challenge: ', error);
  }
};

export const removeChallenge = async (challengeId) => {
  try {
    const challenges = await getChallenges();
    const updatedChallenges = challenges.filter(challenge => challenge.challengeIndex !== challengeId);
    await saveChallenges(updatedChallenges);
  } catch (error) {
    console.error('Error removing challenge:', error);
  }
};

export const removeUser = async (username) => {
  try {
    const users = await getUsers();
    const updatedUsers = users.filter(user => user.username !== username);
    await saveUsers(updatedUsers);
  } catch (error) {
    console.error('Error removing user:', error);
  }
};

export const updateUserDetails = async (username, name, age, image, levelForehand, levelBackhand, levelVolee, levelService, club, surface) => {
  try {
    const users = await getUsers();
    level = 0
    if (Number(levelForehand) && Number(levelBackhand) && Number(levelVolee) && Number(levelService)){
      level = (Number(levelForehand) + Number(levelBackhand) + Number(levelVolee) + Number(levelService))/4
    }
    const updatedUsers = users.map(user =>
      {
      if (user.username === username){
        user.name = name
        user.age = Number(age)
        user.image = image
        user.levelForehand = Number(levelForehand)
        user.levelBackhand = Number(levelBackhand)
        user.levelVolee = Number(levelVolee)
        user.levelService = Number(levelService)
        user.level = level
        user.club = club
        user.surface = surface
      }
      return user
      }

    );
  
    await saveUsers(updatedUsers);
  } catch (error) {
    console.error('Error updating Users:', error);
  }
};

export const updateChallenge = async (challengeIndex, updatedChallenge) => {
  try {
    const challenges = await getChallenges();

    const updatedChallenges = challenges.map(challenge =>
      challenge.challengeIndex === challengeIndex ? { ...challenge, ...updatedChallenge } : challenge
    );

    await saveChallenges(updatedChallenges);
  } catch (error) {
    console.error('Error updating challenge:', error);
  }
};