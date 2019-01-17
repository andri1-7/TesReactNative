import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

// ***** Import Pages ***** //
import Splash from '../Pages/Splash';
import Home from '../Pages/Home';
import Counter from '../Pages/Counter';
// ***** /Import Pages ***** //

const MainStack = createStackNavigator({
  Home: Home,
  Counter: Counter
});

const AppNavigator = createSwitchNavigator({
  Splash: Splash,
  MainStack: MainStack
});

export default createAppContainer(AppNavigator);
