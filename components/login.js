import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

export default function Login() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const navigation = useNavigation();

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleIdChange = (value) => {
    setId(value);
  };

  const handleButtonPress = () => { 
    axios.post('http://your-backend-server/api/login', { name, id })
    .then(response => {
      // Handle the response from the server
      if (response.data.success) {
        // Login successful, navigate to the next screen
        navigation.navigate('createjoin');
      } else {
        console.log('login unsuccessful');
      }
    })
    .catch(error => { 
      console.log('error');
    });
    
  };
 

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.loginText1}>LOGIN</Text>
        <TextInput
          style={styles.inputname}
          placeholder="Enter Name"
          placeholderTextColor="#9B6D92"
          value={name}
          onChangeText={handleNameChange}
        />
        <TextInput
          style={styles.inputname}
          placeholder="Enter Id"
          placeholderTextColor="#9B6D92"
          value={id}
          onChangeText={handleIdChange}
        />
        <TouchableOpacity style={styles.loginbtn} onPress={handleButtonPress}>
          <Text style={styles.loginText}>LOGIN</Text>
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
  label: {  
    borderWidth: 2,
    borderColor: '#8B1874',
    width: 309,
    height: 607,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputname: { 
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
    borderWidth: 0.5, 
    borderColor: '#433C41',
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight:'bold'  
  },
  loginText1:{
    top:-100,
    color: '#8B1874',
    fontSize: 24,
    fontWeight:'bold' 
  }
}); 
 