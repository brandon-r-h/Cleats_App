import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';


const LoginScreen = ({ onSignupPress }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // Add a signup link
  const handleSignupPress = () => {
    navigation.navigate('Signup'); 
  };

  

  const validateEmail = (email) => {
    const emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    return emailRegex.test(email);
  };
  


  const validatePassword = (password) => {
    // Enforce a strong password policy
    return password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password); 
  };

  const handleLogin = async () => { 
    setErrorMessage(null); // Clear previous errors

    if (!validateEmail(username) || !validatePassword(password)) {
      setErrorMessage('Invalid email or password');
      return; 
    } else{
      setIsLoading(true);
      try {
        let value = await AsyncStorage.getItem(username);
        if (value != null){
          const dataValue = JSON.parse(value);
           if (password!=dataValue){
            setErrorMessage('Invalid password');
           } else{
            navigation.navigate('HomeTabs'); 
           }
        }
        else {
          setErrorMessage('What?');
       }
      } catch (error) {
        setErrorMessage('Email does not Exist');
      } finally {
        setIsLoading(false);
      }
      
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setUsername}
        autoCapitalize="none" 
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />

      {isLoading ? (
        <ActivityIndicator size="small" color="#000" /> 
      ) : (
        <Button title="Login" onPress={handleLogin} /> 
      )}

      <TouchableOpacity onPress={handleSignupPress}>
        <Text style={styles.signupLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    width: 280,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  signupLink: {
    marginTop: 15,
    color: '#007AFF', 
    textDecorationLine: 'underline',
  },
});


export default LoginScreen;
