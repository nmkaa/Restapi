import React from 'react';
import { 
  ActivityIndicator,
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  KeyboardAvoidingView, 
  Picker, 
  TextInput, 
  TouchableOpacity,
  Button,
} from 'react-native';

export default class Create extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Нэмэх",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: 'center', flex: 1, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
      price: '',
      description: '',
      categories: [],
      category_id: '',
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories() {
    return fetch('http://172.16.0.205/api/product/get_categories.php')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        loading: false,
        categories: responseJson.categories
      })
    })
    .catch(e => console.log(e))
  }
 
  dataAdd = () =>{    
    // console.log({
    //   name: this.state.name,
    //   description: this.state.description,
    //   price: this.state.price,
    //   category_id: this.state.category_id,
    // })
    return fetch('http://172.16.0.205/api/product/create.php', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Connect-type': 'application/json' 
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        category_id: this.state.category_id,
      })
    })
    .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
        console.log(responseText)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    return (
      this.state.loading ?
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large"/>
      </View>
      :
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container1} enabled>
          <View >
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.textinput} underlineColorAndroid="#00b5ec" onChangeText={(name) => this.setState({name})}/>
          </View>
          <View >
            <Text style={styles.label}>Price:</Text>
            <TextInput style={styles.textinput} underlineColorAndroid="#00b5ec" onChangeText={(price) => this.setState({price})}/>
          </View>
          <View >
            <Text style={styles.label}>Description:</Text>
            <TextInput style={styles.textinput} underlineColorAndroid="#00b5ec" onChangeText={(description) => this.setState({description})}/>
          </View>
          <View >
            <Text style={styles.label}>Categoty:</Text>
            <Picker 
              selectedValue={this.state.category_id}
              style={{height: 50, borderWeight: 1, borderColor: 'black', borderRadius: 4,}}
              onValueChange={(itemValue) =>
                this.setState({category_id: itemValue})
              }>
                {
                   this.state.categories.map((item) =>{
                    return(
                    <Picker.Item  label={item.name} value={item.id} key={item.id}/>
                    );
                  })
                }
            </Picker>
          </View>          
        </KeyboardAvoidingView>
        <View style={styles.container2}>
          <Button style={{width: 100}}
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <TouchableOpacity style={styles.btnContainer} onPress={this.dataAdd} >
            <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
       </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#DCDCDC',},
  container1: {flex: 2, flexDirection: 'column', margin: 10,},
  container2 : {flex: 3, flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center',},
  label: { fontSize: 20, },
  textinput: { height: 40, borderWidth: 0, },
  btnContainer: { backgroundColor: '#00b5ec', padding: 10, alignItems: 'center', marginLeft: 10, width: 100, height:38},
  add: { fontSize: 18, color: 'white', textAlign: 'center'},
});