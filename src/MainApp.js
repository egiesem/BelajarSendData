import React, { Component } from 'react';
import { StyleSheet, View, ListView, Image, Text,Button,  Alert,
  ScrollView,
 
  
  TextInput,
  TouchableOpacity,
   } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";

var URL="https://blog.egiesem.net/send/coba.php";
const endpoint = 'https://blog.egiesem.net/send/signup.php';

const gambar = require('./hamblo.png');
class MainApp extends React.Component {

state = {
    id: '',
    username: '',
    password: '',
  };

  

  onSave = async () => {
    const { username, password } = this.state;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        //category_id: 1,
        username,
        password,
      }),
    });

    const id = await response.json();

    if (id.success === false) {
      Alert.alert('Error', 'There was an error while saving the bookmark');
    } else {
      Alert.alert('Sukses', 'Sukses Daftar Mblo');
      //this.onLoad();
    }
  }

  onusernameChange = (username) => this.setState({ username });
  onpasswordChange = (password) => this.setState({ password });

  render() {
    const { id, username, password } = this.state;

    return (
      <View style={styles.mainContainer}>
       
        <ScrollView style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={this.onusernameChange}
            value={username}
            placeholder="Nama"
          />
          <TextInput
            style={styles.input}
            onChangeText={this.onpasswordChange}
            value={password}
            placeholder="Umur"
          />



          <TouchableOpacity onPress={this.onSave} style={styles.btn}>
            <Text>Save!</Text>
          </TouchableOpacity>
         
        </ScrollView>
      </View>
    );
  }

}



class ChatScreen extends React.Component {


  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
       dataSource: ds,
    };
  }

   AmbilData() {
    fetch(URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows
        (responseData),
      });
    }) .done();
  }

  renderRow(record) {

    return (
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Image source={gambar}  style={styles.icon} />
        </View>
        <View style={styles.info}>
          <Text style={styles.items}>{record.nama}</Text>
          <Text style={styles.pesan}>Jomblo!</Text>
        </View>
        <View style={styles.total}>
          <View style={styles.total}>
          <Text style={styles.waktu}>{record.umur}</Text>
          <Text style={styles.pesan}>Tembak!</Text>
          </View>
        </View>
        
      </View>
      
    );
  }


  
  render() {
     this.AmbilData();
    return (
       <View style={styles.mainContainer}>
        
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    backgroundColor: '#0f1b29',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    paddingTop: 40,
    textAlign: 'center',
  },
  row: {
    borderColor: '#f1f1f1',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
   
   
    borderRadius: 25,
    borderWidth: 0,
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  icon: {
   
    height: 55,
    width: 55,
  },
  info: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  items: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  pesan: {
    color: '#ccc',
    fontSize: 14,
  },
  total: {
    width: 80,
  },
  date: {
    fontSize: 12,
    marginBottom: 5,
  },
  price: {
    color: '#1cad61',
    fontSize: 25,
    fontWeight: 'bold',
  },
  
  toolbar: {
    backgroundColor: '#3498db',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: '#bdc3c7',
    flex: 1,
    height: 500,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  btn: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
});




export default MainApp = TabNavigator(
{ 
  'Daftar Jomblo': { screen: MainApp },
  'List Jomblo Indonesia': { screen: ChatScreen },
  
});

MainApp.navigationOptions = {
  title: 'SendData',
};

