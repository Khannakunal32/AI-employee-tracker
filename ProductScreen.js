import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const PRODUCTS_DATA = [
  {
    id: '1',
    name: 'Product 1',
    price: '$10.99',
    image: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: '2',
    name: 'Product 2',
    price: '$19.99',
    image: 'https://picsum.photos/id/238/200/300',
  },
  {
    id: '3',
    name: 'Product 3',
    price: '$7.99',
    image: 'https://picsum.photos/id/239/200/300',
  },
  {
    id: '4',
    name: 'Product 4',
    price: '$12.99',
    image: 'https://picsum.photos/id/240/200/300',
  },
  {
    id: '5',
    name: 'Product 5',
    price: '$15.99',
    image: 'https://picsum.photos/id/241/200/300',
  },
  {
    id: '6',
    name: 'Product 6',
    price: '$8.99',
    image: 'https://picsum.photos/id/242/200/300',
  },
  {
    id: '7',
    name: 'Product 7',
    price: '$11.99',
    image: 'https://picsum.photos/id/243/200/300',
  },
  {
    id: '8',
    name: 'Product 8',
    price: '$9.99',
    image: 'https://picsum.photos/id/244/200/300',
  },
];

const ProductScreen = () => {
  const renderProductItem = ({ item }) => (
    <View style={styles.productItemContainer}>
      <Image source={{ uri: item.image }} style={styles.productItemImage} />
      <Text style={styles.productItemName}>{item.name}</Text>
      <Text style={styles.productItemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PRODUCTS_DATA}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsListContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 24,
  },
  productItemContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  productItemImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  productItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    width: '100%',
  },
  productItemPrice: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    width: '100%',
  },
});

export default ProductScreen
