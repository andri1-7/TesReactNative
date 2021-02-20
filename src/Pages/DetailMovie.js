import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Button, Icon, Text, Card, Input, CardItem, Item, Header, Left, Right, Body, Title } from 'native-base';

import { connect } from 'react-redux';

import MainStyle from 'kloneApp/src/Styles/MainStyle';
import lang from 'kloneApp/src/Helpers/Language';
import * as Http from 'kloneApp/src/Helpers/Http';

type Props = {};

class DetailMovie extends Component<Props> {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      detailMovie: this.props.navigation.state.params
    }
  }

  componentDidMount(){
    console.log('detailMovie', this.state.detailMovie)
  }

  render() {
    return (
      <View style={MainStyle.container}>
        <Header style={{ backgroundColor: '#650E16' }}>
          <Left>
          </Left>
          <Body>
            <Title>Detail Movie</Title>
          </Body>
          <Right />
        </Header>
        <Card>
          <CardItem>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: this.state.detailMovie.item.Poster }}
                style={{
                  width: 125, height: 150, borderRadius: 10,
                  justifyContent: 'center', alignContent: 'center',
                  alignItems: 'center', alignSelf: 'center'
                }} />
              <Text style={{ textAlign: 'center' }}>IMDBID : {this.state.detailMovie.item.imdbID}</Text>
              <Text style={{ textAlign: 'center' }}>{this.state.detailMovie.item.Title}</Text>
              <Text style={{ textAlign: 'center' }}>Type : {this.state.detailMovie.item.Type} </Text>
              <Text style={{ textAlign: 'center' }}>Tahun : {this.state.detailMovie.item.Year} </Text>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeee'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

const mapStateToProps = state => ({
  counter: state.counter
});

export default connect(mapStateToProps)(DetailMovie);
