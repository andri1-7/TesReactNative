import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet,
  View, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Modal, 
  Alert, 
  TextInput,
  Keyboard
 } from 'react-native';
import {
  Button,
  Icon,
  Text,
  Card,
  Input,
  CardItem,
  Item,
  Header,
  Left,
  Right,
  Body,
  Title,
  Fab,
  Footer,
  FooterTab,
  List,
  ListItem,
  Thumbnail,
  Label,
} from 'native-base';

import { connect } from 'react-redux';

import MainStyle from 'kloneApp/src/Styles/MainStyle';
import lang from 'kloneApp/src/Helpers/Language';
import * as Http from 'kloneApp/src/Helpers/Http';

type Props = {};

class AddContact extends Component<Props> {
  static navigationOptions = { header: null };
  page = 1;
  default_page = 1;

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      age: '',
      photo: '',
      id:'',
      judul: 'Add Contact',
      mode: ''
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params.mode === 'edit') {
      this.getContactDetail(this.props.navigation.state.params.id);
      this.setState({
        judul: 'Edit Contact',
        mode:'edit'
      })
    }
  }

  getContactDetail(id){
    this.setState({
      isLoading: true
    })
    var url = `${Http.API}/contact/${id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((response) => {
        this.setState({
          first_name: response.data.firstName,
          last_name: response.data.lastName,
          age: response.data.age.toString(),
          photo: response.data.photo,
          id: response.data.id,
          isLoading: false
        })
      })
      .catch((error) => {
        Alert.alert(lang('title.error'), error.message);
        this.setState({
          isLoading: false
        })
      });
  }

  addContact() {
    Keyboard.dismiss()
    let params = {};
    params.firstName = this.state.first_name;
    params.lastName = this.state.last_name;
    params.age = this.state.age;
    params.photo = this.state.photo;

    var url = `${Http.API}/contact`;

    console.log("params ", params);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then((response) => {
        console.log("RESPONS ", response);

        if (response.statusCode == 400) {
           Alert.alert('Error', response.message);
        } else {
          // Alert.alert('Success', response.message);
          this.props.navigation.navigate('Contact')
        }

      })
      .catch((error) => {
        console.log("HttpQ Load end shift error ", error);
        // Alert.alert(lang('title.error'), error.message);
      });
  }

  editContact(){
    Keyboard.dismiss()
    let params = {};
    params.firstName = this.state.first_name;
    params.lastName = this.state.last_name;
    params.age = this.state.age;
    params.photo = this.state.photo;

    var url = `${Http.API}/contact/${this.state.id}`;

    console.log("params ", params);

    fetch(url, {
      method: 'PUt',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then((response) => {
        console.log("RESPONS ", response);

        if (response.statusCode == 400) {
          Alert.alert('Error', response.message);
        } else {
          Alert.alert('Success', response.message);
          this.props.navigation.navigate('Contact')
        }

      })
      .catch((error) => {
        console.log("HttpQ Load end shift error ", error);
        // Alert.alert(lang('title.error'), error.message);
      });
  }

  renderButton(){
    console.log('mode', this.state.mode);
    if (this.state.mode == 'edit') {
      return(
        <Button transparent
          style={{ borderRadius: 5 }}
          onPress={() => this.editContact()}>
          <Icon name="edit" type="FontAwesome" />
        </Button>
      )
    } else {
      return (
        <Button transparent
          style={{ borderRadius: 5 }}
          onPress={() => this.addContact()}>
          <Icon name="check" type="FontAwesome" />
        </Button>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: 'rgba(50, 50, 50, 0.87)' }}>
          <Left style={{ flex: 0.15 }}>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon name="times" type="FontAwesome" />
            </Button>
          </Left>
          <Body style={{ flex: 0.65 }}>
            <Title>{this.state.judul}</Title>
          </Body>
          <Right style={{ flex: 0.3 }}>
            {this.renderButton()}
          </Right>
        </Header>
        <View>
          <Item stackedLabel>
            <Label style={styles.fontLabel}>First Name</Label>
            <Input
              style={styles.fontInput}
              value={this.state.first_name}
              onChangeText={(first_name) => this.setState({ first_name })}
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.fontLabel}>Last Name</Label>
            <Input
              style={styles.fontInput}
              value={this.state.last_name}
              onChangeText={(last_name) => this.setState({ last_name })}
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.fontLabel}>Age</Label>
            <Input
              style={styles.fontInput}
              value={this.state.age}
              onChangeText={(age) => this.setState({ age })}
            />
          </Item>
          <Item stackedLabel>
            <Label style={styles.fontLabel}>Photo</Label>
            <Input
              style={styles.fontInput}
              value={this.state.photo}
              onChangeText={(photo) => this.setState({ photo })}
            />
          </Item>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(234, 234, 234, 0.87)'
  },
  fontInput: {
    fontFamily: 'OpenSans-Regular', 
    fontSize: 12
  },
  fontLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: 'rgba(10, 10, 10, 1)'
  }
});

const mapStateToProps = state => ({
  counter: state.counter
});

export default connect(mapStateToProps)(AddContact);
