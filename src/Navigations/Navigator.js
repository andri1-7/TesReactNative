import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

// ***** Import Pages ***** //
// ** Front Pages
import Splash from 'kloneApp/src/Pages/Splash';
import Contact from 'kloneApp/src/Pages/Contact';
import AddContact from 'kloneApp/src/Pages/AddContact';
import EditContact from 'kloneApp/src/Pages/AddContact';
// ***** /Import Pages ***** //

const MainStack = createStackNavigator({
  Contact: Contact,
  AddContact: AddContact,
  EditContact: EditContact
});

const AppNavigator = createSwitchNavigator({
  Splash: Splash,
  MainStack: MainStack
});

export default createAppContainer(AppNavigator);
