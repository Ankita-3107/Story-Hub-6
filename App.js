import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReadStoryScreen from './screens/ReadStoryScreen';
import WriteStoryScreen from './screens/WriteStoryScreen';
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {
  render() {
    return(
       <AppContainer />
    ) 
  }
}

const TabNavigator = createBottomTabNavigator({
    WriteStory: { screen: WriteStoryScreen },
    ReadStory: { screen: ReadStoryScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({}) => {
        const routeName = navigation.state.routeName;
        if (routeName === 'ReadStory') {
          return (
            <Image
              source={require('./assets/read.png')}
              style={{ width: 25, height: 25 }}
            />
          );
        } else if (routeName === 'WriteStory') {
          return (
            <Image
              source={require('./assets/write.png')}
              style={{ width: 25, height: 25 }}
            />
          );
        }
      },
    }),
  }
);

const switchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen},
  TabNavigator: {screen: TabNavigator}
})

const AppContainer = createAppContainer(switchNavigator);
