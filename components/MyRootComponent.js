import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_One_USER } from '../query/user';
import { CREATE_USERS } from '../mutation/user';

const MyRootComponent = () => {
  const [users, setUsers] = useState([]);
  const [oneuser, setOneUser] = useState();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('0');
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USERS);
  console.log(data);
  const {
    data: oneUser,
    loading: loadingOneUser,
    error: errorOneUser,
  } = useQuery(GET_One_USER, { variables: { id: 1 } });

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
    if (!loadingOneUser) {
      setOneUser(oneUser.getUser);
    }
  }, [data, oneUser]);

  const addUser = () => {
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername('');
      setAge('0');
    });
  };
  const getAllUsersNew = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.forHead}>
        <View style={styles.forInputButton1}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.forInput1}
          />
          <Button
            title="Create user"
            onPress={addUser}
            style={styles.forButton1}
          />
        </View>
        <View style={styles.forInputButton2}>
          <TextInput
            value={age}
            onChangeText={setAge}
            style={styles.forInput2}
          />
          <Button
            title="Get all"
            onPress={getAllUsersNew}
            color="pink"
            style={styles.forButton2}
          />
        </View>
      </View>
      <Button title="Get1user" color="blue" />
      <View style={styles.forUsers}>
        {users.map((user) => (
          <Text key={user.id}>
            {user.id},{user.username},{user.age}
          </Text>
        ))}
      </View>
      {oneuser && (
        <Text>
          {oneuser.id},{oneuser.username},{oneuser.age}
        </Text>
      )}
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  forHead: {
    width: '100%',
    height: '30%',
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  forInputButton1: {
    width: '50%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  forInputButton2: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forInput1: {
    backgroundColor: 'grey',
    width: '80%',
    height: 40,
    marginBottom: 5,
  },
  forInput2: {
    backgroundColor: 'grey',
    width: '80%',
    height: 40,
    marginBottom: 5,
  },
  forButton1: {
    // marginTop: 5,
    // width: 400,
    // height: 60,
  },
  forButton2: {
    // width: 200,
    // height: 40,
  },
});

export default MyRootComponent;
