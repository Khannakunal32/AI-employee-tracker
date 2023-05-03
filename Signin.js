import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function AuthenticationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(true);

  const handleSignIn = () => {
    // handle sign in logic here
  }

  const handleSignUp = () => {
    // handle sign up logic here
  }

  const toggleAuthentication = () => {
    setIsSigningIn(!isSigningIn);
  }

  return (
    <View style={styles.container}>
    
      <View style={styles.card}>
        <Text style={styles.title}>{isSigningIn ? 'Sign In' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={isSigningIn ? handleSignIn : handleSignUp}>
          <Text style={styles.buttonText}>{isSigningIn ? 'Sign In' : 'Sign Up'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleAuthentication}>
          <Text style={styles.toggleText}>
            {isSigningIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
      elevation: 5,
      width: 300,
    
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 10,
    textAlign: 'center',
  },
});
