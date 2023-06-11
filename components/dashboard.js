import React from 'react';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Dashboard() {
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
      <View style={styles.lowerDiv} />
        <Text style={styles.heading}>Name User</Text>
        <View style={styles.contents}>
            <Text style={styles.content}>lddhddhdh</Text>
            <Text style={styles.content}>lddhddhdh</Text>
            <Text style={styles.content}>lddhddhdh</Text>
            <Text style={styles.content}>lddhddhdh</Text>
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
    color:'#8B1874',
    justifyContent:'center',
    alignItems:"center",  
    marginTop:55
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
    position:'absolute',
    top:0,
  },
  upperLeft: {
    flex: 1,
    alignItems: 'center',
    top:120,  
  }, 
  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    borderColor:'#868686',
    borderWidth:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 250,
    right: 10,
    backgroundColor:  '#A06D95',
    borderRadius: 20,
    padding: 5,
  },
  lowerDiv: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    position:'absolute'
  },
  contents:{
    flexDirection: 'column',
    right: 100,
    top:75
  },
  content:{  
    left: 100, 
    marginTop: 15, 
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '450',
    fontSize: 14, 
    color: '#8B1874',
  }
});
