import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Attendance = () => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', attendance: false },
    { id: 2, name: 'Jane Smith', attendance: false },
    { id: 3, name: 'Alex Johnson', attendance: false },
    // Add more students as needed
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Today');

  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].attendance = !updatedStudents[index].attendance;
    setStudents(updatedStudents);
  };

  const handleButtonTodayPress = () => {
    setShow(!show);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShow(false);
    const formattedDate =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    setText(formattedDate);
  };

  const handleSaveButtonPress = () => {
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
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              style={styles.datepicker}
            />
          )}
        </View> 
        {!show &&<View style={styles.center}>
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Attendance</Text>
          </View>
          {students.map((student, index) => (
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
                    student.attendance && styles.radioBtnSelected,
                  ]}
                  onPress={() => toggleAttendance(index)}
                >
                  {student.attendance && <View style={styles.radioBtnInner} />}
                </TouchableOpacity>
                <Text style={styles.attendanceText}>
                  {student.attendance ? 'Present' : 'Absent'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.savebtn} onPress={handleSaveButtonPress}>
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
        </View>}
        
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
  center:{
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
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
    padding:5,
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
    padding:5,
    width:100,   
    justifyContent: 'center',
    alignItems: 'center',
    bottom:10,
    position:'absolute'
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent:'center',
    alignItems:'center',
  },
  datepicker:{
    color:'#A06D95',
    backgroundColor:'#A06D95'
  }
});

export default Attendance;
