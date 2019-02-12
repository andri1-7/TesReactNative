import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

// ***** Import Pages ***** //
// ** Front Pages
import Splash from 'kloneApp/src/Pages/Splash';
import Home from 'kloneApp/src/Pages/Home';
import Counter from 'kloneApp/src/Pages/Counter';
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
