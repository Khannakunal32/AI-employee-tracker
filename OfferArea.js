import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const offersData = [
  {
    id: 1,
    title: 'My Event 1',
    image: 'https://static.vecteezy.com/system/resources/previews/002/503/060/original/flat-simple-wall-calendar-design-style-cartoon-illustration-drawing-vector.jpg',
  },
  {
    id: 2,
    title: 'My Event 2',
    image: 'https://static.vecteezy.com/system/resources/previews/002/503/060/original/flat-simple-wall-calendar-design-style-cartoon-illustration-drawing-vector.jpg',
    },
    {
        id: 3,
        title: 'My Event 3',
        image: 'https://static.vecteezy.com/system/resources/previews/002/503/060/original/flat-simple-wall-calendar-design-style-cartoon-illustration-drawing-vector.jpg',
      },
      {
        id: 4,
        title: 'My Event 4',
        image: 'https://static.vecteezy.com/system/resources/previews/002/503/060/original/flat-simple-wall-calendar-design-style-cartoon-illustration-drawing-vector.jpg',
    },
    {
        id: 5,
        title: 'My Event 5',
        image: 'https://static.vecteezy.com/system/resources/previews/002/503/060/original/flat-simple-wall-calendar-design-style-cartoon-illustration-drawing-vector.jpg',
      },
      {
        id: 6,
        title: 'My Event 6',
        image: 'https://static.vecteezy.com/system/resources/previews/002/503/060/original/flat-simple-wall-calendar-design-style-cartoon-illustration-drawing-vector.jpg',
    
      },
];

const OfferArea = () => {
    const handleProductClick = (product) => {
        navigation.navigate('ProductDetails', { product });
      };
  return (
      <View style={styles.container}>
           <Text style={styles.title}>{"Upcoming schedules"}</Text>
      <View style={styles.offersContainer}>
        <FlatList
          horizontal
          data={offersData}
          keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
              
            <View style={styles.offerContainer}>
              <Image source={{ uri: item.image }} style={styles.offerImage} />
              <Text style={styles.offerTitle}>{item.title}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://cdn.dribbble.com/users/24203/screenshots/2057111/media/a53700a15f968e6f749745fa426f52b4.jpg?compress=1&resize=400x300&vertical=top' }}
          style={styles.bannerImage}
        />
          </View>
          <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5cddf79237127800016fac3d/1585502257323-BPCU1QA13IJ7J7IA9UGZ/DataSay-1.png' }}
          style={styles.bannerImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },  title: {
    fontSize: 20,
    fontWeight: 'bold',

    
    color:'tomato'
  },
  offersContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  offerContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  offerTitle: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  bannerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'tomato'
  },
});

export default OfferArea;
