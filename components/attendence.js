import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Attendance = () => {
  const navigation = useNavigation();
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', attendance: false },
    { id: 2, name: 'Jane Smith', attendance: false },
    { id: 3, name: 'Alex Johnson', attendance: false },
    // Add more students as needed
  ]);

  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].attendance = !updatedStudents[index].attendance;
    setStudents(updatedStudents);
  };

  const handleButtonTodayPress = () => {};
  const handleSaveButtonPress = () => {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.today}>
          <TouchableOpacity style={styles.todaybtn} onPress={handleButtonTodayPress}>
            <Text style={styles.todayText}>Today</Text>
            <Icon name="calendar" size={20} color="#8B1874" />
          </TouchableOpacity>
        </View>
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
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  today: {
    width: 150,
    height: 43,
    left: 32,
    top: 26,
  },
  todaybtn: {
    borderWidth: 1,
    borderColor: '#8B1874',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  tableContainer: {
    top: 10,
    borderWidth: 1,
    borderColor: '#8B1874',
    backgroundColor: '#FADFF0',
    borderRadius: 10,
    margin: 20,
    width: 329,
    height: 520,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 10,
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
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B1874',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBtnSelected: {
    backgroundColor: '#8B1874',
  },
  radioBtnInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  attendanceText: {
    fontWeight: 'bold',
    color: '#8B1874',
  },
  savebtn: {
    width: 145,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#8B1874',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
};

export default Attendance;
