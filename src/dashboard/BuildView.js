// @flow

import React, { PureComponent } from 'react'
import { View, ScrollView } from 'react-native'
import { Card, CardItem, Text, Left, Body } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import { reduxify } from '../utils'
import type { Build } from '../services/BitriseClient'
import BuildStatusBadge from './BuildStatusBadge'
import BuildBranchBadge from './BuildBranchBadge'

const style = EStyleSheet.create({
  container: {
    backgroundColor: '$mediumGrey',
    flex: 1,
  },
})

type Props = {
  build: Build,
}
@reduxify(state => ({
  build: state.dashboard.build,
}))
export default class BuildView extends PureComponent<Props, void> {

  static navigationOptions = ({ navigation }: { navigation: any }) => ({ // eslint-disable-line react/no-unused-prop-types
    title: navigation.state.params.title,
  });

  render() {
    const { build } = this.props
    const triggerDate = new Date(build.triggered_at)
    return (
      <View style={style.container}>
        <Card style={{ flex: 0, height: 150 }}>
          <CardItem>
            <Left style={{ flex:0, width: 210 }}>
              <BuildStatusBadge style={{ width: 190 }} build={build} />
            </Left>
            <Body><Text>{build.status_text}</Text></Body>
          </CardItem>
          <CardItem>
            <Left style={{ flex:0, width: 210 }}>
              <BuildBranchBadge style={{ width: 190 }} build={build} />
            </Left>
            <Body>
              <Text>{build.triggered_workflow}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left style={{ flex:0, width: 110 }}>
              <Text>{build.triggered_by}</Text>
            </Left>
            <Body>
              <Text>{triggerDate.toLocaleString()}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Body style={{ height: 300 }}>
              <ScrollView>
                <Text>{build.commit_message}</Text>
              </ScrollView>
            </Body>
          </CardItem>
        </Card>
      </View>
    )
  }

}
