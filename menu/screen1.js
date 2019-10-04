import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import Information from './information'
import Screen3 from './screen3'
import Notification from './chat.js'
import Help from './help.js'

class Screen1 extends Component {
    static navigationOptions = {
        title: 'Нүүр хуудас',
        headerTitleStyle: { textAlign: 'center', flex: 1 }
      };
  
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.homeBn} onPress={() => this.props.navigation.navigate('Information')} > 
            <Image style={{width: 50, height: 50}} 
              source={{uri: 'https://img.icons8.com/offices/16/000000/information.png'}} />
            <Text style={styles.text}> Мэдээ, мэдээлэл </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBn2} onPress={() => this.props.navigation.navigate('Screen3')}>
            <Image style={{width: 50, height: 50}} 
              source={{uri: 'https://img.icons8.com/dusk/64/000000/product.png'}} />
            <Text style={styles.text}> Бүтээгдэхүүн </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBn3}>
            <Image style={{width: 50, height: 50}} 
              source={{uri: 'https://img.icons8.com/carbon-copy/80/000000/worldwide-location.png'}} />
            <Text style={styles.text}> Холбоо барих </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <TouchableOpacity style={styles.homeBn} onPress={() => this.props.navigation.navigate('Help')} > 
            <Image style={{width: 50, height: 50}} 
              source={{uri: 'https://img.icons8.com/ios/50/000000/help.png'}} />
            <Text style={styles.text}> Категори </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBn2} onPress={() => this.props.navigation.navigate('Notification')} >
            <Image style={{width: 50, height: 50}} 
              source={{uri: 'https://img.icons8.com/cotton/64/000000/topic-push-notification.png'}} />
            <Text style={styles.text}> Мэдэгдэл </Text>
          </TouchableOpacity>
        </View>
      </View>
      
    );
  }
}
const AppNavigator = createStackNavigator({
  Home: { screen: Screen1 },
  Information: { screen: Information, path: 'https://www.nso.mn/' },
  Screen3: { screen: Screen3 },
  Notification: {screen: Notification},
  Help: {screen: Help}
});

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  text: {
    textAlign: 'center',
  },
  container1:{
    paddingTop: 20,
    marginTop: 50,
    marginLeft: 20,
    flexDirection: 'row',
  },
  container2:{
    paddingTop: 20,
    marginTop: 20,
    marginLeft: 90,
    flexDirection: 'row',
  },
  homeBn: {
    width: 100,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBn2: {
    width: 100,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBn3: {
    width: 100,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(AppNavigator);