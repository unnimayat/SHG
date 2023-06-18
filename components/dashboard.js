import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
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

const Dashboard = ({ route }) => {
  const [uname, setUname] = useState('');
  const [amount, setAmount] = useState(0);
  const [uid, setUId] = useState('');
  const [userid, setUserId] = useState('');
  const [isadmin, setIsadmin] = useState(false);
  const [paymentId,setpaymentId]=useState('');
  const [description,setDescription]=useState('');

  const navigation = useNavigation();

  const { name, id, unit } = route.params;
  console.log(route)

  const tableData = [
    { date: '2023-06-01', amount: 100 },
  ];

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
      setUname(name);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (uid !== '') {
      axios.get(`https://backendshg-0jzh.onrender.com/users/${uid}/hasadminAccess`).then(response => {
        setIsadmin(response.data.hasAdminAccess)
        console.log(isadmin)
      })
    }
  }, [uid])

  // useEffect(() => {
  //   if (route && route.params && route.params.member) {
  //     const { name, id,unit } = route.params.member;
  //     setUserId(id);
  //     setUname(name);
  //   }
  // }, [route]);

  const handleAddMessage = () => {
    axios
      .post('https://backendshg-0jzh.onrender.com/makepayment', { userID: uid, id: id, amt: amount })
      .then(response => {
        console.log('Requested to make payment')
        console.log({userID: uid, id: id, amt: amount})
        console.log(response.data);
        setpaymentId(response.data.paymentId); 
        navigation.navigate('unit');
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <View style={styles.container}>
      {/* Upper div */}
      <View style={styles.upperDiv}>
        <View style={styles.upperLeft}>
          <View style={styles.profileCircle}>
            <Ionicons name="person-circle-outline" size={120} color="#A06D95" />
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Ionicons name="pencil-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.info}>
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.id}>ID: {id}</Text>
      <Text style={styles.id}>Unit: {unit}</Text>
    </View>

      {/* Lower div */}
      <View style={styles.lowerDiv}>
        <View style={styles.contents}>
          {/* ... Contents ... */}
          {/* <View style={styles.tableContainer}>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
            {tableData.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.rowDate}>{item.date}</Text>
                <Text style={styles.rowAmount}>{item.amount}</Text>
              </View>
            ))}
          </View> */}
          {isadmin && <View style={styles.messageBox}>
            <Text style={styles.date}>{currentDate}</Text>
            {/* ... Message Box Contents ... */}
            <TextInput
              style={styles.input}
              placeholder="Enter the amount paid"
              value={amount === 0 ? '' : amount.toString()}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleAddMessage}>
              <MaterialIcons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>}
          
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
          <Ionicons name="person-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  messageBox: {
    position: 'absolute',
    width: 320,
    height: 80,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    bottom: '50%',
    left: '50%',
    transform: [{ translateX: -60.5 }, { translateY: 150 }],
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#8B1874',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  date: {
    position: 'absolute',
    top: 2,
    right: 2,
    color: '#777777',
    fontSize: 12,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B1874',
    marginLeft: 8, // Adjust the value as needed
  },


  inputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 40,
    left: 500,
    bottom: 40,
    paddingHorizontal: 10,
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
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#8B1874',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  
  info: {
    position: 'absolute',
    left: 2,
    top: 300,
    width: '100%',
  },
  name: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#A06D95',
    marginBottom: 10,
  },
  id: {
    fontSize: 16,
    color: '#777777',
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#A06D95',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width:200,
    height:200,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowDate: {
    flex: 1,
    fontSize: 14,
  },
  rowAmount: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});
export default Dashboard;