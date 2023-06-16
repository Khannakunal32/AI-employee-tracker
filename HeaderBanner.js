import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

const HeaderBanner = ({ images, height, autoplayInterval }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (autoplay) {
        setActiveIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [images, autoplay, autoplayInterval]);

  const renderImage = ({ item }) => {
   
    return  <Image style={styles.image} source={require(`./assets/bpit.png`)} />

  };

  const stopAutoPlay = () => {
    setAutoplay(false);
  };

  const startAutoPlay = () => {
    setAutoplay(true);
  };

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={renderImage}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          loop={true}
          autoplay={false}
          interval={autoplayInterval}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: activeIndex === index ? '#fff' : '#888' },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

HeaderBanner.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  height: PropTypes.number,
  autoplayInterval: PropTypes.number,
};

HeaderBanner.defaultProps = {
  height: 200,
  autoplayInterval: 3000,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 10,
    width:'95%',
    elevation: 5,
  },
  carouselContainer: {
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    opacity: 0.5,
  },
});

export default HeaderBanner;
