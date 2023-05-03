import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking ,Image} from 'react-native';
import { Card } from 'react-native-elements';

export default function SupportPage() {

  const handleChatPressed = () => {
    // Handle chat button pressed action
      console.log("Chat button pressed");
      Linking.openURL('https://www.example.com/chat');
  }

  const handleConcernPressed = () => {
    // Handle concern button pressed action
      console.log("Concern button pressed");
      Linking.openURL('mailto:support@example.com');
  }
  const makeCall = () => {
    Linking.openURL(`tel:+919897120391`);
  }

  return (
      <View style={styles.container}>
          <Image style={styles.image} source={{uri:'https://www.seqrite.com/skin/frontend/default/seqrite_v1/images/support-img.png'}} />
      <Text style={styles.title}>Need help?</Text>
      <View style={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={handleChatPressed}>
            <Text style={styles.cardTitle}>Chat with us</Text>
            <Text style={styles.cardText}>Chat with our support team if you need any assistance.</Text>
          </TouchableOpacity>
        </Card>
        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={handleConcernPressed}>
            <Text style={styles.cardTitle}>Send a concern</Text>
            <Text style={styles.cardText}>Send us your concerns or issues with the app.</Text>
          </TouchableOpacity>
              </Card>
        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={makeCall}>
            <Text style={styles.cardTitle}>Call Us</Text>
            <Text style={styles.cardText}>Share us your concerns or issues with the app.</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
      marginBottom: 20,
    color:'tomato'
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
      paddingHorizontal: 10,
  
  },
  card: {
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
      },
});
