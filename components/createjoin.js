import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [unit_name, setName] = useState('');
  const [unit_id, setId] = useState('');
  const [createLabel, setCreateLabel] = useState(true);
  const [joinLabel, setJoinLabel] = useState(false);
  const navigation = useNavigation();

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleIdChange = (value) => {
    setId(value);
  };

  const handleButtonCreatePress = () => {
    setCreateLabel(true);
    setJoinLabel(false);
  };

  const handleButtonJoinPress = () => {
    setCreateLabel(false);
    setJoinLabel(true);
  };

  const handleButtonPress = () => {
    navigation.navigate('unit');
  };

  return (
    <View style={styles.container}>
      {/* button */}
      <View style={styles.topbutton}>
        <TouchableOpacity
          style={[styles.topButton, createLabel ? styles.selectedButton : styles.nonselectedButton]}
          onPress={handleButtonCreatePress}
        >
          <Text style={[styles.buttonText, createLabel ? styles.selectedButtonText : styles.nonselectedButtonText]}>CREATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.topButton, joinLabel ? styles.selectedButton : styles.nonselectedButton]}
          onPress={handleButtonJoinPress}
        >
          <Text style={[styles.buttonText, joinLabel ? styles.selectedButtonText : styles.nonselectedButtonText]}>JOIN</Text>
        </TouchableOpacity>
      </View>

      {/* label */}
      {createLabel ? (
        <View style={styles.label}>
          <Text style={styles.loginText1}>CREATE</Text>
          <TextInput
            style={styles.inputname}
            placeholder="Enter Unit Name"
            placeholderTextColor="#9B6D92"
            value={unit_name}
            onChangeText={handleNameChange}
          />
          <TextInput
            style={styles.inputname}
            placeholder="Enter Unit Id"
            placeholderTextColor="#9B6D92"
            value={unit_id}
            onChangeText={handleIdChange}
          />
          <TouchableOpacity style={styles.loginbtn} onPress={handleButtonPress}>
            <Text style={styles.loginText}>CREATE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.label}>
          <Text style={styles.loginText1}>JOIN</Text>
        </View>
      )}

      {/* navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton}>
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton}>
          <Text style={styles.buttonText}>Create / Join</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#8B1874',
  },
  label: {
    borderWidth: 2,
    borderColor: '#8B1874',
    width: 329,
    height: 520,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputname: {
    borderWidth: 0.5,
    borderColor: '#433C41',
    width: 243,
    height: 41,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    lineHeight: 18,
    color: '#8B1874',
    padding: 10,
    fontSize: 12,
    marginTop: 10,
  },
  loginbtn: {
    width: 145,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#8B1874',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText1: {
    color: '#8B1874',
    fontSize: 24,
    fontWeight: 'bold',
    bottom: 50,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A06D95',
    width: 329,
    height: 42,
    top: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  navbarButton: {
    flex: 1,
    alignItems: 'center',
    width: 60,
    height: 22,
    top:10,
    padding:0
  },
});
