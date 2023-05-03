import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetails = ({ navigation, route }) => {
  const { product } = route.params;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 300;

  const suggestedProducts = [
    {
        id: 1,
        name: 'Summer Sale',
          image: 'https://picsum.photos/id/237/300/200',
        price:100
      },
      {
        id: 2,
        name: 'Get 20% off',
          image: 'https://picsum.photos/id/238/300/200',
          price:100
        },
        {
            id: 3,
            name: 'Summer Sale',
            image: 'https://picsum.photos/id/239/300/200',
            price:100
          },
          {
            id: 4,
            namwe: 'Get 20% off',
              image: 'https://picsum.photos/id/240/300/200',
              price:100
        },
        {
            id: 5,
            name: 'Summer Sale',
            image: 'https://picsum.photos/id/241/300/200',
            price:100
          },
          {
            id: 6,
            name: 'Get 20% off',
              image: 'https://picsum.photos/id/242/300/200',
              price:100
          },
  ];

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

    return (
      
      <ScrollView style={styles.container}>
           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
           <Ionicons name="ios-arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceCurrency}>$</Text>
          <Text style={styles.price}>{product.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 4}>
          {product.description.length > MAX_DESCRIPTION_LENGTH
            ? `${product.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
            : product.description}
        </Text>
        {product.description.length > MAX_DESCRIPTION_LENGTH && (
          <TouchableOpacity onPress={toggleDescription} style={styles.readMoreButton}>
            <Text style={styles.readMoreButtonText}>
              {showFullDescription ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.suggestedProductsContainer}>
        <Text style={styles.suggestedProductsTitle}>Suggested Products</Text>
        <ScrollView horizontal={true}>
          {suggestedProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.suggestedProductItem}>
              <Image source={{ uri: product.image }} style={styles.suggestedProductImage} />
              <Text style={styles.suggestedProductName}>{product.name}</Text>
              <Text style={styles.suggestedProductPrice}>${product.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
    },
    infoContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    priceCurrency: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'tomato',
    },
    price: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'tomato',
      marginLeft: 5,
    },
    description: {
      fontSize: 18,
      lineHeight: 26,
      marginBottom: 20,
    },
    readMoreButton: {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      color: 'blue',
      fontWeight: 'bold',
    },
    addToCartButton: {
      backgroundColor: 'tomato',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      marginBottom: 30,
      marginTop:20,
    },
    addToCartButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    suggestedProductsContainer: {
      backgroundColor: '#f2f2f2',
      padding: 20,
    },
    suggestedProductsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    suggestedProductItem: {
      marginRight: 20,
    },
    suggestedProductImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    suggestedProductName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    suggestedProductPrice: {
      fontSize: 14,
      color: 'grey',
      fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 999,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.35)',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backdropFilter: 'blur(10px)',
      },
      backButtonIcon: {
        width: 20,
        height: 20,
        color: '#fff',
      },
      
      
  });


export default ProductDetails;
