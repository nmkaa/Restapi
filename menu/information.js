import React from 'react';
import { 
  Linking,
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Image, 
  ScrollView
} from 'react-native';


export default class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Information",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: {flex: 1, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://www.nso.mn/content/2293#.XZWeckYzbIU');
          }}>
            <Image source={require('./images/1.png')} style={styles.divImage} />
            <Text style={styles.text}>2019-10-03 14:30:27</Text>
            <Text style={styles.text}>“Олон хэмжээст ядуурлын индексийн тооцооны арга зүй”-г бий болгоно</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => {
            Linking.openURL('https://www.nso.mn/content/2292#.XZWsEkYzbIU');
          }}>
            <Image source={require('./images/2.png')} style={styles.divImage} />
            <Text>2019-10-09 10:36:40</Text>
            <Text>Ахмадуудаа хүлээн авч, хүндэтгэл үзүүллээ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.div}>
          <TouchableOpacity>
            <Text>Мэдээ, мэдээлэл</Text>
            <Image source={require('./images/3.png')} style={styles.divImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.div}>
          <TouchableOpacity>
            <Text>Мэдээ, мэдээлэл</Text>
            <Image source={require('./images/1.png')} style={styles.divImage} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DCDCDC',
  },
  div: {
    backgroundColor: 'white', width:370, height: 220, margin: 10, borderBottomEndRadius: 10, borderBottomStartRadius: 10
  },
  divImage: {
    width:370, height: 150,
  },
  text: {
    marginLeft: 5
  }
});