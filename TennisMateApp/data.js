import AsyncStorage from '@react-native-async-storage/async-storage';

const USERs_KEY = '@users_';

export const checkUser = async (username, password) => {
    let userOk= false
    const users = await getUsers();
    users.array.forEach(user => {
        if (user.username === username && user.password === password){
            userOk = true;
        }
    });
    return userOk
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

export const saveTODOs = async (todos) => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOs_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving TODOs:', error);
  }
};

export const addTODO = async (todo) => {
  try {
    const todos = await getTODOs();
    todos.push(todo);
    await saveTODOs(todos);
  } catch (error) {
    console.error('Error adding TODO:', error);
  }
};

export const removeTODO = async (todoId) => {
  try {
    const todos = await getTODOs();
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    await saveTODOs(updatedTodos);
  } catch (error) {
    console.error('Error removing TODO:', error);
  }
};

export const updateTODO = async (todoId, updatedTodo) => {
  try {
    const todos = await getTODOs();
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, ...updatedTodo } : todo
    );
    await saveTODOs(updatedTodos);
  } catch (error) {
    console.error('Error updating TODO:', error);
  }
};