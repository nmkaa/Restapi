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
  Button 
} from 'react-native';
import Swipeout from "react-native-swipeout";

const Item = ({ name, id, description, price, category_id, category_name, onPress }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPress} >
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.title}>{price}</Text>
        <Text style={styles.title}>{category_id}</Text>
        <Text style={styles.title}>{category_name}</Text> 
      </TouchableOpacity>
    </View>
  );
}

export default class Delete extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Delete",
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

  dataDelete = () => {
    return fetch('http://172.16.0.205/api/product/delete.php', {
      method: 'DELETE',
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
      <Swipeout style={styles.SwipeBG}
                right={this.swipeBtns}
                // close={this.state.activeRow !== index}
                // rowID={index}
                // sectionId={1}
                autoClose={true}>
        city  >
        <View style={styles.container}>
        <View>
            <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('Add')} >
              <Text style={styles.addText}>Add new</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity  >
          <FlatList
            data={this.state.records}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => <Item id={item.id} 
                                            name={item.name} 
                                            description={item.description} 
                                            price={item.price}
                                            category_id={item.category_id}
                                            category_name={item.category_name} 
                                            onPress={() => this.gotoScreen(item.id)}
                                      />
                        }
            keyExtractor={item => item.id}
          />
        </TouchableOpacity>
      </View>
      </Swipeout>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DCDCDC',
  },
  add: {
    backgroundColor: '#E1ECFE',
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    marginLeft: 100,
    marginRight: 50,
    width: 200,
    height: 50,
    margin: 10,
  },
  item: {
    flex: 2,
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
  },
  addText: {
    textAlign: "center",
    justifyContent: 'center',
  }
});