import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import Header from './Header';
import HeaderBanner from './HeaderBanner';
import OfferArea from './OfferArea';
import PopularProducts from './PopularProducts';
import ProductScreen from './ProductScreen';
import SearchBar from './SearchScreen';

const headerBanners = [
   'bpit.png',

];
const popularProducts = [
    {
      id: 1,
      name: 'Attendence',
      image: 'https://www.talentproindia.com/wp-content/uploads/2020/11/How-Does-the-Attendance-Management-System-Help-the-Employees.jpg',
    price: '999',
      page:'Attendence',
        rating: 4.5,
      description:`The Samsung Galaxy S21 Ultra 5G is the ultimate smartphone for power users. With a stunning 6.8-inch Dynamic AMOLED display and a 120Hz refresh rate, everything you do on this phone will look incredibly smooth and crisp. The 5G connectivity means you can stream and download content at lightning-fast speeds, and the powerful Snapdragon 888 processor and 12GB of RAM ensure you can multitask without any lag.

      The camera system on the Galaxy S21 Ultra 5G is truly impressive, with a quad-lens setup that includes a 108-megapixel main sensor, a 12-megapixel ultra-wide sensor, and two 10-megapixel telephoto sensors. You can capture incredibly detailed photos and videos, and the 100x Space Zoom feature lets you get up close to the action even from far away.
      
      The phone has a large 5000mAh battery that can easily last all day, and it supports fast wired and wireless charging as well as reverse wireless charging. The phone runs on the latest version of Android with Samsung's One UI 3.1 on top, which offers a clean and intuitive user interface. If you're looking for the best of the best in terms of smartphones, the Samsung Galaxy S21 Ultra 5G is definitely worth considering.`
    },
    {
      id: 2,
      name: 'Payroll',
      page:'PayRoll',
      image: 'https://cdn.dribbble.com/users/6554494/screenshots/14937819/media/b7bfefff389f9592ff3d2cb99ce12c56.png?compress=1&resize=400x300&vertical=top',
      price: '899',
        rating: 4.3,
         description:`The Samsung Galaxy S21 Ultra 5G is the ultimate smartphone for power users. With a stunning 6.8-inch Dynamic AMOLED display and a 120Hz refresh rate, everything you do on this phone will look incredibly smooth and crisp. The 5G connectivity means you can stream and download content at lightning-fast speeds, and the powerful Snapdragon 888 processor and 12GB of RAM ensure you can multitask without any lag.

      The camera system on the Galaxy S21 Ultra 5G is truly impressive, with a quad-lens setup that includes a 108-megapixel main sensor, a 12-megapixel ultra-wide sensor, and two 10-megapixel telephoto sensors. You can capture incredibly detailed photos and videos, and the 100x Space Zoom feature lets you get up close to the action even from far away.
      
      The phone has a large 5000mAh battery that can easily last all day, and it supports fast wired and wireless charging as well as reverse wireless charging. The phone runs on the latest version of Android with Samsung's One UI 3.1 on top, which offers a clean and intuitive user interface. If you're looking for the best of the best in terms of smartphones, the Samsung Galaxy S21 Ultra 5G is definitely worth considering.`
    
    },
    {
      id: 3,
      name: 'Analytics',
      page:'Analytics',
      image: 'https://venturebeat.com/wp-content/uploads/2022/04/predictive-analytics-e1657579909113.jpg?fit=5250%2C2625&strip=all',
      price: '1,299',
        rating: 4.8,
        description:`The Samsung Galaxy S21 Ultra 5G is the ultimate smartphone for power users. With a stunning 6.8-inch Dynamic AMOLED display and a 120Hz refresh rate, everything you do on this phone will look incredibly smooth and crisp. The 5G connectivity means you can stream and download content at lightning-fast speeds, and the powerful Snapdragon 888 processor and 12GB of RAM ensure you can multitask without any lag.

        The camera system on the Galaxy S21 Ultra 5G is truly impressive, with a quad-lens setup that includes a 108-megapixel main sensor, a 12-megapixel ultra-wide sensor, and two 10-megapixel telephoto sensors. You can capture incredibly detailed photos and videos, and the 100x Space Zoom feature lets you get up close to the action even from far away.
        
        The phone has a large 5000mAh battery that can easily last all day, and it supports fast wired and wireless charging as well as reverse wireless charging. The phone runs on the latest version of Android with Samsung's One UI 3.1 on top, which offers a clean and intuitive user interface. If you're looking for the best of the best in terms of smartphones, the Samsung Galaxy S21 Ultra 5G is definitely worth considering.`
      
    },
    {
      id: 4,
      name: 'Support',
      page:'Support',
      image: 'https://www.seqrite.com/skin/frontend/default/seqrite_v1/images/support-img.png',
      price: '499',
        rating: 4.9,
        description:`The Samsung Galaxy S21 Ultra 5G is the ultimate smartphone for power users. With a stunning 6.8-inch Dynamic AMOLED display and a 120Hz refresh rate, everything you do on this phone will look incredibly smooth and crisp. The 5G connectivity means you can stream and download content at lightning-fast speeds, and the powerful Snapdragon 888 processor and 12GB of RAM ensure you can multitask without any lag.

        The camera system on the Galaxy S21 Ultra 5G is truly impressive, with a quad-lens setup that includes a 108-megapixel main sensor, a 12-megapixel ultra-wide sensor, and two 10-megapixel telephoto sensors. You can capture incredibly detailed photos and videos, and the 100x Space Zoom feature lets you get up close to the action even from far away.
        
        The phone has a large 5000mAh battery that can easily last all day, and it supports fast wired and wireless charging as well as reverse wireless charging. The phone runs on the latest version of Android with Samsung's One UI 3.1 on top, which offers a clean and intuitive user interface. If you're looking for the best of the best in terms of smartphones, the Samsung Galaxy S21 Ultra 5G is definitely worth considering.`
      
    },
    {
      id: 5,
      name: 'Settings',
      page:'Setting',
      image: 'https://img.freepik.com/premium-vector/gear-icon-gears-sign-gears-vector-gears-logo-element-gears-pictogram-gear-wheel-gears-round-icon-vector-illustration_116137-2462.jpg',
      price: '1,499',
        rating: 4.7,
        description:`The Samsung Galaxy S21 Ultra 5G is the ultimate smartphone for power users. With a stunning 6.8-inch Dynamic AMOLED display and a 120Hz refresh rate, everything you do on this phone will look incredibly smooth and crisp. The 5G connectivity means you can stream and download content at lightning-fast speeds, and the powerful Snapdragon 888 processor and 12GB of RAM ensure you can multitask without any lag.

        The camera system on the Galaxy S21 Ultra 5G is truly impressive, with a quad-lens setup that includes a 108-megapixel main sensor, a 12-megapixel ultra-wide sensor, and two 10-megapixel telephoto sensors. You can capture incredibly detailed photos and videos, and the 100x Space Zoom feature lets you get up close to the action even from far away.
        
        The phone has a large 5000mAh battery that can easily last all day, and it supports fast wired and wireless charging as well as reverse wireless charging. The phone runs on the latest version of Android with Samsung's One UI 3.1 on top, which offers a clean and intuitive user interface. If you're looking for the best of the best in terms of smartphones, the Samsung Galaxy S21 Ultra 5G is definitely worth considering.`
      
    }
  ];
  
const HomeScreen = () => {
  return (
      <ScrollView style={styles.container}>
          <Header />
          <SearchBar onSearch={(e)=>{console.log(e)}} />
    <View style={styles.banner}>
     <HeaderBanner images={headerBanners} />
    </View>

    <View style={styles.popularProductsContainer}>
    
     <PopularProducts products={popularProducts} />
    </View>

    <OfferArea />

    <View style={styles.productsContainer}>
  
    </View>


  </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    height: 200,
   
    justifyContent: 'center',
      alignItems: 'center',

  },
  popularProductsContainer: {
    marginTop: 20,
      paddingHorizontal: 10,
    
  },
  popularProductsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offersContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  offerBanner: {
    width: '48%',
    height: 100,
    backgroundColor: '#ccc',
  },
  productsContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  bottomTabs: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default HomeScreen;
