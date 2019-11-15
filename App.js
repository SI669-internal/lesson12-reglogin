import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import firebase from 'firebase';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAh14cD4qJXn2z33su21lIePQrSg5ojk4E",
  authDomain: "lesson12-reglo.firebaseapp.com",
  databaseURL: "https://lesson12-reglo.firebaseio.com",
  projectId: "lesson12-reglo",
  storageBucket: "lesson12-reglo.appspot.com",
  messagingSenderId: "974892087149",
  appId: "1:974892087149:web:d37c1f841d37d92312cc64"
};

class LoginScreen extends React.Component {
  constructor(props)  {
    super(props);
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(); 
    this.usersRef = db.collection('users');
    this.state = {
      errorMessage: '',
      usernameText: '',
      passwordText: ''
    }
  }


  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Welcome!</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text>{this.state.errorMessage}</Text>
          <View style={styles.bodyRow}>
            <Text>Username:</Text>
            <Input
              placeholder="Username"
              autoCapitalize="none"
              value={this.state.usernameText}
              onChangeText={(text)=>{this.setState({usernameText: text})}}
            />
          </View>
          <View style={styles.bodyRow}>
            <Text>Password:</Text>
            <Input
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              value={this.state.passwordText}
              onChangeText={(text)=>{this.setState({passwordText: text})}}
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Button
            title="Login"
            containerStyle={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('Home', {mode: 'returning'})}
          />
          <Button
            title="Create Account"
            containerStyle={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('Home', {mode: 'new'})}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

class HomeScreen extends React.Component{
  constructor(props) {
    super(props);
    let mode = this.props.navigation.getParam('mode');
    let welcomeMessage = 'Welcome, ';
    if (mode === 'returning') {
      welcomeMessage = 'Welcome back, ';
    }
    this.state = {
      welcomeMessage: welcomeMessage,
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>{this.state.welcomeMessage}Stranger!</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',  
    padding: 30
  },
  bodyContainer: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 50
  },
  footerContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    margin: 10
  }
});