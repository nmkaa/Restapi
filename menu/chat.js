import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            Linking.openURL('http://aboutreact.com');
          }}>
          Click Here http://aboutreact.com
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
});