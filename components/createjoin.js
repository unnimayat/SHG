import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

export default function Login() {
  const [unit_name, setName] = useState('');
  const [unit_id, setId] = useState('');

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleIdChange = (value) => {
    setId(value);
  };

  const handleButtonPress = () => {
    // Handle button press action here
    console.log('Button pressed');
  };
 

  return (
    <View style={styles.container}>
        {/* button */}
      <View style={styles.topbutton}>
        <TouchableOpacity style={styles.topButton1}>
          <Text style={styles.buttonText1}>CREATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton2}>
          <Text style={styles.buttonText2}>JOIN</Text>
        </TouchableOpacity>
      </View>
      <br></br>
        {/* label */}
      <View style={styles.label}>
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
  topbutton:{
    display:'flex',
    flexDirection:'row'
  },
  topButton1:{
    width:70,
    height:49,
    backgroundColor:'#8B1874',
    borderBottomLeftRadius:15,
    borderTopLeftRadius:15, 
  },
  topButton2:{
    width:70,
    height:49,
    backgroundColor:'#D9D9D9',
    borderBottomRightRadius:15,
    borderTopRightRadius:15,
  },
  buttonText2: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'#8B1874',
    padding:10
  },
  buttonText1: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'#D9D9D9',
    padding:10
  },
  label: {
    backgroundColor: '#8B1874',
    width: 309,
    height: 607,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputname: {
    width: 243,
    height: 41,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
    lineHeight: 18,
    color: '#8B1874',
    padding: 10,
    fontSize: 12,
    borderWidth: 0,
    marginTop: 10,
  },
  loginbtn: {
    width: 145,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#8B1874',
    fontSize: 20,
    fontWeight:'bold'  
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A06D95', 
    width:309,
    height:42,
    top:10,
    borderTopLeftRadius: 15,  
    borderTopRightRadius: 15,  
    overflow: 'hidden', 
  },
  navbarButton: {
    flex: 1,
    alignItems: 'center',
    width: 60,
    height: 22
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#D9D9D9',
    paddingTop:10
  },
});  