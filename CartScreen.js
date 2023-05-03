import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Product 1', price: 9.99, quantity: 2 },
    { id: '2', name: 'Product 2', price: 19.99, quantity: 1 },
      { id: '3', name: 'Product 3', price: 14.99, quantity: 3 },
      { id: '4', name: 'Product 4', price: 14.99, quantity: 3 },
      { id: '5', name: 'Product 5', price: 14.99, quantity: 3 },
  ]);

  const updateQuantity = (id, quantity) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const removeItem = (id) => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Image source={{uri:"https://picsum.photos/id/241/300/200"}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
      
        <TouchableOpacity style={styles.decrementButton} onPress={() => updateQuantity(item.id, item.quantity - 1)}>
        <Text style={styles.decrementButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
  
        <TouchableOpacity style={styles.incrementButton} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
        <Text style={styles.incrementButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
              <View style={styles.removeButton}>
              <MaterialIcons name="delete" size={24} color="red" />
         
        </View>
      </TouchableOpacity>
    </View>
  );

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.cartList}
          />
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Total: </Text>
            <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#f2f2f2',
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 10,
      color: '#999',
    },
    quantity: {
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 10,
    },
    removeItem: {
      fontSize: 16,
    },
    removeButton: {
     
      borderRadius: 5,
      padding: 5,
    },
    removeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cartList: {
      flex: 1,
      marginTop: 20,
    },
    totalPriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginVertical: 10,
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    totalPriceLabel: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    totalPrice: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#FFC107',
        padding: 15,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 5,
    
      },
      checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    incrementButton: {
        backgroundColor: '#007AFF', // Blue color
        borderRadius: 5,
        padding: 10,
      },
      incrementButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    decrementButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 10,
      },
      decrementButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      },
  });
  


export default CartScreen;

