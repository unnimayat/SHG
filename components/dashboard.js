import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      console.log('Token retrieved successfully');
      const decodedToken = jwt_decode(token);
      const { name, id } = decodedToken;
      console.log(name);
      console.log(id);
      return { name, id };
    } else {
      console.log('Token not found');
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve token', error);
    return null;
  }
};

export default function Dashboard() {
  const [uname, setUname] = useState('');
  const [amount, setAmount] = useState(0);
  const [uid, setUId] = useState('');
  const [isadmin, setIsadmin] = useState(false);
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('login');
  };
  const handleProfilePress = () => {
    navigation.navigate('dashboard');
  };
  const handleCreatePress = () => {
    navigation.navigate('createjoin');
  };
  const handleEditPress = () => {
    navigation.navigate('editprofile');
  };

  useEffect(() => {
    const fetchData = async () => {
      const { name, id } = await retrieveToken();
      console.log(id);
      setUId(id);
    };
    fetchData();
  }, []);

  const handleAddMessage = () => {
    axios
      .post('https://backendshg-0jzh.onrender.com/makepayment', { userID: uid, id: uid, amt: amount })
      .then(response => {
        console.log(response.data);
        navigation.navigate('PaymentSummary', { paymentData: response.data });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Upper div */}
      <View style={styles.upperDiv}>
        <View style={styles.upperLeft}>
          <View style={styles.profileCircle}>
            <Ionicons name="person-circle-outline" size={120} color="#A06D95" />
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil-outline" size={20} color="#FFFFFF" onPress={handleEditPress} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lower div */}
      <View style={styles.lowerDiv}>
        <View style={styles.contents}>
          {/* ... Contents ... */}

          <View style={styles.messageBox}>
            {/* ... Message Box Contents ... */}
            <TextInput
              style={styles.input}
              placeholder="Enter amount paid"
              value={amount.toString()}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddMessage}>
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHomePress}>
          <Ionicons name="home-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleCreatePress}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleProfilePress}>
          <Ionicons name="person-outline" size={24} color="#FFFFFF" />
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B1874',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#A06D95',
    width: 329,
    height: 42,
    position: 'absolute',
    bottom: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  navbarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  upperDiv: {
    backgroundColor: '#A06D95',
    width: 329,
    height: '35%',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
  },
  upperLeft: {
    flex: 1,
    alignItems: 'center',
    top: 120,
  },
  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    borderColor: '#868686',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 250,
    right: 10,
    backgroundColor: '#A06D95',
    borderRadius: 20,
    padding: 5,
  },
  lowerDiv: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    flexDirection: 'column',
    right: 100,
    top: 75,
  },
  content: {
    left: 100,
    marginTop: 15,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '450',
    fontSize: 14,
    color: '#8B1874',
  },
  inputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 40,
    right: 1,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  messageBox: {
    position: 'absolute',
    width: 320,
    height: 80,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    bottom: '50%',
    left: '50%',
    transform: [{ translateX: -50.5 }, { translateY: -25 }],
    zIndex: 1,
  },

  input: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#8B1874',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B1874',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
