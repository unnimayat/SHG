import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import CustomButton from './CustomButton';

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/shg.png')} style={styles.image} />
        </View>
      </View>
      <View style={styles.container2}>
        <View>
          <CustomButton
            title="Get started"
            onPress={pressHandler}
            textColor="#8B1874"
            
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  container2: {
    backgroundColor: '#8B1874',
    width: 500,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    backgroundColor: '#ffffff',
    width: 500,
    height: '50%',
  },
});
