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
  Image 
} from 'react-native';

export default class Update extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Update",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: 'center', flex: 1, }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: '',
      name: '',
      price: '',
      description: '',
      categories: [],
      category_id: '',
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');    
    this.setState({id: itemId, loading: true},() => this.getReadOne(itemId));     
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

  getReadOne = (id) => {
    return fetch(`http://172.16.0.205/api/product/read_one.php?id=${id}`)
    .then((res) => res.json())
    .then((resJson) => {
        if (resJson.status) {
          this.setState({
            name: resJson.data.name,
            price: resJson.data.price,
            description: resJson.data.description,
            category_id: resJson.data.category_id,
            loading: false
          })
        } else {
          alert('Not Found');
        }
      })
    .catch((error) => {
      console.error(error);
    });
  }

  dataUpdate = () => {
    return fetch('http://172.16.0.205/api/product/update.php', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Connect-type': 'application/json' 
      },
      body: JSON.stringify({
        id: this.state.id,
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

  dataDelete = () => {
    return fetch('http://172.16.0.205/api/product/delete.php', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Connect-type': 'application/json' 
      },
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        category_id: this.state.category_id,
      })
    })
    .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson);
        console.log(responseJson)
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
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Product list edit</Text>
      <KeyboardAvoidingView style={styles.container1} enabled>
        <View >
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Id: {this.state.id}</Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.textinput} value={this.state.name} underlineColorAndroid="#00b5ec" onChangeText={(name) => this.setState({name})}/>
        </View>
        <View >
          <Text style={styles.label}>Price:</Text>
          <TextInput style={styles.textinput} value={this.state.price} underlineColorAndroid="#00b5ec" onChangeText={(price) => this.setState({price})}/>
        </View>
        <View >
          <Text style={styles.label}>Description:</Text>
          <TextInput style={styles.textinput} value={this.state.description} underlineColorAndroid="#00b5ec" onChangeText={(description) => this.setState({description})}/>
        </View>
        <View >
          <Text style={styles.label}>Categoty:</Text>
          <Picker 
            selectedValue={this.state.category_id}
            style={{height: 50, borderWidth:1, borderColor: 'blue'}}
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
        <TouchableOpacity style={styles.btnContainer} onPress={this.dataUpdate} >
          <Text style={styles.add}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete} onPress={this.dataDelete} >
          <Text style={styles.add}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#DCDCDC',},
  container1: {flex: 2, flexDirection: 'column', margin: 10,},
  container2 : {flex: 3, flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center',},
  label: { fontSize: 20, },
  textinput: { height: 40, borderWidth: 0, },
  btnContainer: { backgroundColor: 'green', padding: 10, margin: 10, width: 100, },
  add: { fontSize: 20, color: 'white', textAlign: 'center' },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
},
delete: {backgroundColor: 'red', padding: 10, margin: 10, width: 100, }
});