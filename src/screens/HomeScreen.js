import React, {Component} from 'react'
import {Location, Permissions, TaskManager} from 'expo'
import {Screen} from '../components/Screen'
import {Button} from '../components/Button'
import {Text} from '../components/Text'
import {BACKGROUND_LOCATION_TASK_NAME} from '../contants/constants'
import axios from 'axios'
import {Alert} from 'react-native'

export class HomeScreen extends Component {
  state = {enabled: false, empId: null}

  async componentDidMount() {
    this.setState({
      empId: this.props.navigation.getParam('empId'),
    })

    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      alert('Location permission required')
    }

    this.showAlert()
    if (
      await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK_NAME)
    ) {
      this.setState({enabled: true})
    }
  }

  showAlert = () => {
    Alert.alert(
      'GPS Alert!',
      'Please Make sure GPS is enabled',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false}
    )
  }
  onPress = async () => {
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 20,
      showsBackgroundLocationIndicator: true,
    })
    this.setState({enabled: true})
  }

  disable = async () => {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME)
    this.setState({enabled: false})
  }

  render() {
    return (
      <Screen>
        <Button onPress={this.onPress}>
          <Text>Enable background location</Text>
        </Button>

        <Button onPress={this.disable}>
          <Text>Disable background location</Text>
        </Button>

        {this.state.enabled && <Text>Tracking enabled</Text>}

        <Button
          onPress={() =>
            this.props.navigation.navigate('Location', {
              empId: this.state.empId,
            })
          }
        >
          <Text>Track location</Text>
        </Button>

        <Button
          onPress={() => {
            axios
              .delete(
                'https://fierce-scrubland-42898.herokuapp.com/deleleteEmployeeLocations/' +
                  this.props.navigation.getParam('empId')
              )
              .then(response => {
                Alert.alert(
                  'Locations Deleted Successfully',
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false}
                )
              })
          }}
        >
          <Text>Delete Previous Locations</Text>
        </Button>
      </Screen>
    )
  }
}
