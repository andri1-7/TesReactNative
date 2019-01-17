import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from 'native-base';

import { connect } from 'react-redux';

import MainStyle from '../Styles/MainStyle';
import lang from '../Helpers/Language';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class Home extends Component<Props> {
  render() {
    return (
      <View style={MainStyle.container}>
        <Icon name="facebook" type="FontAwesome" />
        <Text style={styles.welcome}>Welcome to { lang('title.home') }!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button iconRight dark
          onPress={() => this.props.navigation.navigate('Counter')}
          style={{alignSelf: 'center'}}
        >
          <Text>Counter Page ({ this.props.counter })</Text>
          <Icon name="chevron-right" type="FontAwesome"/>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});

const mapStateToProps = state => ({
  counter: state.counter
});

export default connect(mapStateToProps)(Home);
