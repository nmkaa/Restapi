import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Image } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer, 
} from 'react-navigation';
import Create from './crud/create'
import List from './crud/update'

const Item = ({ name, id, description, price, category_id, category_name, onPress }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onPress} >
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.title}>{price}</Text>
        {/* <Text style={styles.title}>{category_id}</Text> */}
        <Text style={styles.title}>{category_name}</Text> 
      </TouchableOpacity>
    </View>
  );
}
 
class Screen3 extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Product List",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: 'center', flex: 1, }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      records: []
    }
  }

  componentDidMount() {
    this.dataRead()
  }

  gotoScreen(id) {
    this.props.navigation.navigate("Update", {
      itemId:id 
    })
  }
  FlatListItemSeparator = () => {
    return (
      <View style={{height: 3, width: '90%', backgroundColor: '#C8C8C8'}}/>
    );
  };
  
  dataRead = () => {
    return fetch('http://172.16.0.205/api/product/read.php')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        loading: false,
        records: responseJson.records
      })

    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() 
  {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
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
                                            // category_id={item.category_id}
                                            category_name={item.category_name} 
                                            onPress={() => this.gotoScreen(item.id)}
                                      />
                        }
            keyExtractor={item => item.id}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const AppNavigator = createSwitchNavigator({
  Home: { screen: Screen3 },
  Add: { screen: Create },
  Update: { screen: List },
},
{
  initialRouteName: 'Home',
});

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

export default createAppContainer(AppNavigator);