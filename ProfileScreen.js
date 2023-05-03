import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';


const ProfileScreen = () => {
   
    const isAuthenticated = true;
    const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
        profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
        loggedIn: true,
      };
    const logout=""
  const handleLogout = () => {
   console.log('logout')
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View>
          <View style={styles.profileSection}>
            <Avatar
              rounded
              size="xlarge"
              source={
                user.profilePicture
                  ? { uri: user.profilePicture }
                  : {uri:"https://randomuser.me/api/portraits/men/1.jpg"}
              }
              containerStyle={styles.avatarContainer}
            />
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.editSection}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
              <Text style={styles.editButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>You are not logged in.</Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: 'white',
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  editSection: {
    flexDirection: 'row',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  loginText: {
    fontSize: 20,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  signupButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default ProfileScreen;
