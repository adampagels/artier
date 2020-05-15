import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import NameScreen from "../screens/NameScreen";
import EmailScreen from "../screens/EmailScreen";
import PasswordScreen from "../screens/PasswordScreen";
import LocationScreen from "../screens/LocationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";

const AppContainer = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Notification: NotificationScreen,
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Name: NameScreen,
  Email: EmailScreen,
  Password: PasswordScreen,
  Location: LocationScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Auth: AuthStack,
      App: AppContainer,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
