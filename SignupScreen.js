import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AsyncStorage} from 'react-native';



const SignupScreen = ({ onLoginPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; 
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password); 
  };


  const handleAlreadyPress = () => {
    navigation.navigate('Login'); 
  };

  const handleSignup = async () => {
    setErrorMessage(null);

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return; 
    } else if (!validatePassword(password)) {
      setErrorMessage('Password does not meet requirements');
      return; 
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    } else{
      setIsLoading(true); 
      try {
        await AsyncStorage.setItem(email, JSON.stringify(password));
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setIsLoading(false);
        
      }  

      
      
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={setConfirmPassword}
      />

      {isLoading ? (
        <ActivityIndicator size="small" color="#000" /> 
      ) : (
        <Button title="Create Account" onPress={handleSignup} />
      )}

      <TouchableOpacity onPress={handleAlreadyPress}>
        <Text style={styles.signupLink}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

// Reuse the styles object from your LoginScreen.js
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

export default SignupScreen;
