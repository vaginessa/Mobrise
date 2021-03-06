// @flow

import React, { PureComponent } from 'react'
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation'
import { BackHandler, Platform } from 'react-native'
import autobind from 'autobind-decorator'
// $FlowFixMe
import Expo from 'expo'
import { reduxify } from '../utils'
import ConnectionScreen from '../connection/ConnectionScreen'
import AppList from '../dashboard/AppList'
import AppView from '../dashboard/AppView'
import BuildView from '../dashboard/BuildView'
import style from '../style'
import { connect as translate } from '../I18n'

// $FlowFixMe
export const Navigator = StackNavigator({
  Connection: {
    screen: ConnectionScreen,
  },
  Apps: {
    screen: AppList,
  },
  App: {
    screen: AppView,
  },
  Build: {
    screen: BuildView,
  },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: style.$green,
      paddingTop: Expo.Constants.statusBarHeight,
      height: (Platform.OS === 'android' ? 56 : 44) + Expo.Constants.statusBarHeight,
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerBackTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  },
})

type Props = {
  dispatch?: (any) => void,
  navigation?: any,
  t?: (string) => string,
}

@reduxify(state => ({ navigation: state.navigation }))
@translate()
export default class NavigationScreen extends PureComponent<Props, void> {

  constructor(props: Props) {
    super(props)
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress)
  }

  render() {
    // $FlowFixMe
    return <Navigator screenProps={{ t: this.props.t }} navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.navigation })} />
  }

  @autobind
  onHardwareBackPress() {
    const { navigation } = this.props
    if (navigation && navigation.index) {
      const dispatch = (this.props.dispatch: any)
      dispatch(NavigationActions.back())
      return true
    }
    return false
  }

}
