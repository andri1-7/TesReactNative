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
  ActivityIndicator
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
 } from 'native-base';

import { connect } from 'react-redux';

import MainStyle from 'kloneApp/src/Styles/MainStyle';
import lang from 'kloneApp/src/Helpers/Language';
import { NavigationEvents } from "react-navigation";
import * as Http from 'kloneApp/src/Helpers/Http';

type Props = {};

class Contact extends Component<Props> {
  static navigationOptions = { header: null };
  page = 1;
  default_page = 1;
  focusListner;

  constructor(props) {
    super(props);
    this.state = {
      contact: [],
      isLoading: false
    }

    this.focusListner = this.props.navigation.addListener("didFocus", () => {
      this.getContact()
    });
  }

  componentDidMount() {
    this.getContact();
  }

  componentWillUnmount() {
    this.focusListner.remove()
  }

  getContact() {

    this.setState({
      isLoading: true
    })
    var url = `${Http.API}/contact`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((response) => {
        console.log('response',response);
        this.setState({
          contact: response.data,
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

  deleteContact(id) {

    this.setState({
      isLoading: true
    })
    var url = `${Http.API}/contact/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((response) => {
        console.log('respose', id);
        this.setState({
          isLoading: false
        })
        Alert.alert('Success', response.message);
        this.getContact();
      })
      .catch((error) => {
        Alert.alert(lang('title.error'), error.message);
        this.setState({
          isLoading: false
        })
      });
  }

  navigateEditContact(id) {
    this.props.navigation.navigate('EditContact', { id: id, mode: 'edit'})
  }

  renderContact() {
    return (
      <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 50 }}>
        <FlatList
          data={this.state.contact}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          ref={el => this.flatList = el}
          renderItem={({ item, index }) => (
            <CardItem cardBody style={styles.card}>
              <View style={{ alignItems: 'center', marginRight: 8, flex: 0.2 }}>
                <Thumbnail source={{uri: item.photo}} style={{ height: 40, width: 40 }} />
              </View>
              <View style={{flex: 0.5}}>
                <View style={{flexDirection:'column', marginBottom:15}}>
                  <Text>{item.firstName} {item.lastName}</Text>
                  <Text>{item.age} Tahun</Text>
                </View>
              </View>
              <View style={{flex:0.4}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                    <Button transparent
                      style={{ borderRadius: 5 }}
                      onPress={() => this.navigateEditContact(item.id)}>
                      <Icon name="edit" type="FontAwesome" style={{ color: 'rgba(50, 50, 50, 0.87)' }} />
                    </Button>
                  </View>
                  <View style={{flex:0.5}}>
                    <Button transparent
                      style={{ borderRadius: 5 }}
                      onPress={() => this.deleteContact(item.id)}>
                      <Icon name="trash" type="FontAwesome" style={{ color: 'rgba(50, 50, 50, 0.87)'}}  />
                    </Button>
                  </View>
                </View>
              </View>
            </CardItem>
          )}
        />
      </View>
    )
  }

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/* <NavigationEvents
          onDidFocus={this.getContact()}
          // onWillFocus={() => this.setState({ isLoading: true })}
        /> */}
        <Header style={{ backgroundColor: 'rgba(50, 50, 50, 0.87)' }}>
          <Left>
          </Left>
          <Body>
            <Title>Contact</Title>
          </Body>
          <Right />
        </Header>
        <Card transparent>
          {this.renderContact()}
        </Card>
        <View style={{ flex: 1 }}>
          <Fab
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: 'rgba(50, 50, 50, 0.87)', marginBottom:50 }}
            position="bottomRight"
            onPress={(() => this.props.navigation.navigate('AddContact', {mode: 'add'}))}>
            <Icon name="plus" type="FontAwesome" />
          </Fab>
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
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    margin: 10,
    borderRadius: 10
  }
});

const mapStateToProps = state => ({
  counter: state.counter
});

export default connect(mapStateToProps)(Contact);
