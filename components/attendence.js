import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
//import 'react-datepicker/dist/react-datepicker.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import axios from 'axios';
// import DateTimePicker from '@react-native-community/datetimepicker'; 
// import 'react-date-range/dist/theme/default.css'; // theme css file
// import { Calendar } from 'react-date-range';
import DatePicker from 'react-native-date-ranges';
const Attendance = () => {
  const navigation = useNavigation();
  const currentDate = new Date();
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const [text, setText] = useState('');
  const [uid, setUId] = useState('')

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwt_decode(token);
        const { name, id } = decodedToken;
        console.log(name)
        console.log(id)
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

  useEffect(() => {
    const fetchData = async () => {
      const { name, id } = await retrieveToken();
      console.log(id);
      setUId(id);
    };
    fetchData();
    handleDateChange(currentDate)
  }, [])

  useEffect(() => {
    // Fetch attendance data from the endpoint
    if (uid != '') {
      axios.get(`https://backendshg-0jzh.onrender.com/attendance/${uid}/${text}`)
        .then(response => {
          console.log(text);
          const attendanceData = response.data;

          console.log(response.data.presentUsers);
          setStudents(response.data.presentUsers);
          console.log(students)

        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [text, uid]);

  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].present = !updatedStudents[index].present;
    setStudents(updatedStudents);
  };

  const handleButtonTodayPress = () => {
    setShow(!show);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShow(false);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setText(formattedDate);
  };
  // ...existing code...

  const handleSaveButtonPress = () => {
    // Create a new array with the required format for posting
    const postData = {
      id: uid,
      date: text,
      presentUsers: students.map((student) => ({
        name: student.name,
        id: student.id,
        present: student.present ? 1 : 0,
      })),
    };
    console.log(postData);

    // Make the POST request to the server
    axios
      .post('https://backendshg-0jzh.onrender.com/attendance', postData)
      .then((response) => {
        // Handle the response if needed
        console.log('Attendance data saved successfully');
        navigation.navigate('unit');
      })
      .catch((error) => {
        console.error('Failed to save attendance data', error);
      });
    navigation.navigate('unit');
  };
 

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.today}>
          <TouchableOpacity style={styles.todaybtn} onPress={handleButtonTodayPress}>
            <Text style={styles.todayText}>{text}</Text>
            <Icon name="calendar" size={16} color="#8B1874" />
          </TouchableOpacity>
          {show && (
            // <DatePicker
            //   selected={selectedDate}
            //   onChange={handleDateChange}
            //   dateFormat="dd/MM/yyyy"
            //   style={styles.datepicker}
            // />
            <DatePicker
              style={{width:350,height:45}}
              customStyles={{
                placeholderText:{fontSize:20},
                // headerStyle:{ },
                // headerMarkTitle:{},
                // contentInput:{},
                // contentText:{},

              }}
              centerAlign
              allowFontScaling={false}
              mode={'range'} 
              onChange={handleDateChange}
            />
            // <Calendar
            //   date={new Date()}
            //   onChange={this.handleDateChange}
            // />
          )}
        </View>
        {!show && (
          <View style={styles.center}>
            <View style={styles.tableContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.headerCell}>ID</Text>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>Attendance</Text>
              </View>
              {students?.map((student, index) => (
                <TouchableOpacity
                  key={student.id}
                  style={styles.row}
                  onPress={() => toggleAttendance(index)}
                >
                  <Text style={styles.cell}>{student.id}</Text>
                  <Text style={styles.cell}>{student.name}</Text>
                  <View style={styles.attendanceCell}>
                    <TouchableOpacity
                      style={[
                        styles.radioBtn,
                        student.present && styles.radioBtnSelected,
                      ]}
                      onPress={() => toggleAttendance(index)}
                    >
                      {student.present && <View style={styles.radioBtnInner} />}
                    </TouchableOpacity>
                    <Text style={styles.attendanceText}>
                      {student.present ? 'Present' : 'Absent'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

            </View>
            <TouchableOpacity style={styles.savebtn} onPress={handleSaveButtonPress}>
              <Text style={styles.saveText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: {
    width: 200,
    height: 50,
    left: 32,
    top: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todaybtn: {
    borderWidth: 1,
    borderColor: '#8B1874',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 5,
  },
  todayText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 29,
    color: '#8B1874',
    marginRight: 5,
  },
  selectedDate: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 29,
    color: '#8B1874',
  },
  tableContainer: {
    top: 10,
    borderRadius: 10,
    margin: 20,
    width: 329,
    height: 520,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#8B1874',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  cell: {
    flex: 1,
  },
  attendanceCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtn: {
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A06D95',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBtnSelected: {
    backgroundColor: '#A06D95',
  },
  radioBtnInner: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  attendanceText: {
    fontWeight: '400',
    color: '#A06D95',
  },
  savebtn: {
    backgroundColor: '#A06D95',
    borderRadius: 10,
    padding: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    position: 'absolute',
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datepicker: {
    color: '#A06D95',
    backgroundColor: '#A06D95',
  },
});

export default Attendance;
