import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 
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
     
        navigation.navigate('createjoin');
      
    
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
    backgroundColor: '#A06D95',
    borderRadius: 10, 
    padding:5,
    width:100,   
    justifyContent: 'center',
    alignItems: 'center',
    top:40,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent:'center',
    alignItems:'center',
  },
  loginText1:{
    top:-100, 
    fontSize: 20,
    fontWeight: 'bold', 
    color:'#8B1874'
  }
}); 
 