import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PopularProducts = ({ products }) => {
  const navigation = useNavigation();

  const handleProductClick = (product) => {
    navigation.navigate(product.page, { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Dashboard</Text>
      <ScrollView horizontal={true}>
        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.item} onPress={() => handleProductClick(product)}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            {/* <View>
              <Text style={styles.price}>{product.price}</Text>
              <Text style={styles.rating}>Rating: {product.rating}</Text>
            </View> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: 'tomato',
  },
  item: {
    marginRight: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
    marginTop: 5,
  },
  rating: {
    fontSize: 12,
    marginTop: 5,
    color: 'grey',
  },
});

export default PopularProducts;
