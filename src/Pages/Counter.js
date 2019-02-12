import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  Button,
  Icon
} from 'native-base';

/**
 * Redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from 'kloneApp/src/Actions';

import MainStyle from 'kloneApp/src/Styles/MainStyle';

class Counter extends Component {
  render() {
    return(
      <View style={MainStyle.container}>
        <View style={{flexDirection: 'row'}}>
          <Button danger small onPress={() => this.props.counterStrike(false)}>
            <Icon name="minus" type="FontAwesome"/>
          </Button>
          <Button success small onPress={() => this.props.counterStrike(true)}>
            <Icon name="plus" type="FontAwesome"/>
          </Button>
        </View>
        <Text>Counter { this.props.counter }</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = dispatch => bindActionCreators(AppActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
