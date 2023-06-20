import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import SwitchSelector from 'react-native-switch-selector';
import { useTranslation } from 'react-i18next';
export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('login');
  };

  const options = [
    { label: 'english', value: 'en' },
    { label: 'malayalam', value: 'mal' }
  ];

  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/shg.png')} style={styles.image} />
        </View>
      </View>
      <SwitchSelector options={options} onPress={(language) => {
        alert(language)
        i18n.changeLanguage(language)
      }} />

      <View style={styles.container2}>
        <View>
          {/* button */}
          <View style={styles.topbutton}>
            <TouchableOpacity
              style={[styles.topButton, 1 ? styles.selectedButton : styles.nonselectedButton]}
            // onPress={handleButtonCreatePress}
            >
              <Text style={[styles.buttonText, 1 ? styles.selectedButtonText : styles.nonselectedButtonText]}>CREATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.topButton, 1 ? styles.nonselectedButton : styles.selectedButton]}
            // onPress={handleButtonJoinPress}
            >
              <Text style={[styles.buttonText, 1 ? styles.nonselectedButtonText : styles.selectedButtonText]}>JOIN</Text>
            </TouchableOpacity>
          </View>

          
          <CustomButton
            title={t("Getstarted")}
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
  topbutton: {
    display: 'flex',
    flexDirection: 'row',
    left: 100,
    bottom: 20,
  },
  topButton: {
    width: 60,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#A06D95',
  },
  nonselectedButton: {
    borderWidth: 2,
    borderColor: '#8B1874',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D9D9D9',
    padding: 5,
  },
  selectedButtonText: {
    color: '#fff',
  },
  nonselectedButtonText: {
    color: '#FFFFFF',
  },
  label: {
    borderWidth: 2,
    borderColor: '#8B1874',
    width: 329,
    height: 580,
    borderRadius: 10,
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
