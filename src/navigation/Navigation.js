import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import NameScreen from "../screens/NameScreen";
import EmailScreen from "../screens/EmailScreen";
import PasswordScreen from "../screens/PasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AddArtScreen from "../screens/AddArtScreen";
import MasterpiecesScreen from "../screens/MasterpiecesScreen";
import { Ionicons } from "@expo/vector-icons";

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-home" size={30} color={tintColor} />
            ),
          },
        },
        Notifications: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-notifications" size={30} color={tintColor} />
            ),
          },
        },
        Masterpieces: {
          screen: MasterpiecesScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="md-medal" size={30} color={tintColor} />
            ),
          },
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-person" size={30} color={tintColor} />
            ),
          },
        },
      },
      {
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false,
          style: {
            borderRadius: 30,
            backgroundColor: "#fefefe",
            borderTopWidth: 0,
            shadowColor: "transparent",
            position: "absolute",
            bottom: 0,
            shadowColor: "#333",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 6,
            shadowOpacity: 0.3,
          },
        },
      }
    ),
    addArtModal: {
      screen: AddArtScreen,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Name: NameScreen,
    Email: EmailScreen,
    Password: PasswordScreen,
  },
  {
    headerMode: "none",
  }
);

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
