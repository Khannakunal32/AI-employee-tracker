import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <Ionicons style={styles.searchIcon} name="search-outline" size={24} color="#666" />
        <TextInput 
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#777"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default SearchBar;
