import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  _onDone = () => {
    this.setState({ showRealApp: true });
  };

  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  render() {
    if (this.state.showRealApp) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 50,
          }}>
          <Text>
            This will be your screen when you click Skip from any slide or Done
            button at last
          </Text>
        </View>
      );
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
        //   onDone={this._onDone}
        />
      );
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
});
 
const slides = [
  {
    key: 's1',
    title: 'Fashion',
    text: 'Category for anything related to fashion.',
    image: {
      uri:
        'https://img.icons8.com/color/100/000000/long-formal-dress.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Electronics',
    text: 'Gadgets, drones and more.',
    image: {
      uri:
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'Motors',
    text: 'Motor sports and more',
    image: {
      uri: 'https://img.icons8.com/color/100/000000/tesla-model-x.png',
    },
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Movies',
    text: ' Movie products.',
    image: {
      uri: 'https://img.icons8.com/pastel-glyph/100/000000/movie-beginning.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'Books',
    text: 'Kindle books, audio books and more.',
    image: {
      uri:
        'https://img.icons8.com/doodle/100/000000/books.png',
    },
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Sports',
    text: 'Drop into new winter gear.',
    image: {
      uri:
        'https://img.icons8.com/color/100/000000/ea-sports.png',
    },
    backgroundColor: '#febe29',
  },
];