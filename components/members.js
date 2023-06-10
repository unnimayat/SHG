import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MemberListPage = () => {
  const members = [
    { id: 1, name: 'John Doe', attendance: 80, savings: 200 },
    { id: 2, name: 'Jane Smith', attendance: 95, savings: 300 },
    { id: 3, name: 'Alice Johnson', attendance: 75, savings: 150 },
    { id: 4, name: 'Bob Anderson', attendance: 90, savings: 250 },
  ];

  const renderMemberItem = ({ item }) => {
    return (
      <View style={styles.memberItem}>
        <Text style={styles.memberCell}>{item.name}</Text>
        <Text style={styles.memberCell}>{item.attendance}%</Text>
        <Text style={styles.memberCell}>${item.savings}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Member List</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Attendance</Text>
        <Text style={styles.headerCell}>Savings</Text>
      </View>
      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B1874',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 4,
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    color: '#8B1874',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  memberItem: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 10,
  },
  memberCell: {
    flex: 1,
    fontSize: 14,
    color: '#A06D95',
    textAlign: 'center',
  },
});

export default MemberListPage;
