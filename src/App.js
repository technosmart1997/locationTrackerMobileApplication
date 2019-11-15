import React from 'react'
import {HomeScreen} from './screens/HomeScreen'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import {colors} from './contants/colors'
import {LocationScreen} from './screens/LocationScreen'
import {AsyncStorageDebugScreen} from './screens/AsyncStorageDebugScreen'
import {MapScreen} from './screens/MapScreen'
import {BackgroundTasksDebugScreen} from './screens/BackgroundTasksDebugScreen'
import {LoginScreen} from './screens/LoginScreen'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Employee Login',
      },
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Dashboard',
      },
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        title: 'Track Location',
      },
    },
    AsyncStorageDebug: {
      screen: AsyncStorageDebugScreen,
      navigationOptions: {
        title: 'Async Storage',
      },
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        title: 'Map',
      },
    },
    BackgroundTasksDebug: {
      screen: BackgroundTasksDebugScreen,
      navigationOptions: {
        title: 'Tasks',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)
export const App = createAppContainer(AppNavigator)
