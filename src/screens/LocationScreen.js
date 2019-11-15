import React from 'react'
import {Location, MapView} from 'expo'
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import {Button} from '../components/Button'
import {Screen} from '../components/Screen'
//import {Text} from '../components/Text'
import axios from 'axios'

const GEOLOCATION_OPTIONS = {}

export class LocationScreen extends React.Component {
  state = {
    empId: null,
    insertData: true,
    tracking: false,
    subscription: null,
    location: {coords: {latitude: 0, longitude: 0}},
  }

  async componentDidMount() {
    this.setState({
      empId: this.props.navigation.getParam('empId'),
    })

    this.watchId = await Location.watchPositionAsync(
      {
        accuracy: 5,
        timeInterval: 3000,
        distanceInterval: 0,
      },

      this.locationChanged
    )
    this.setState({tracking: true, subscription: sub})
  }

  onStopTracking = () => {
    // this.watchId.remove();
    setTimeout(() => {
      this.props.navigation.navigate('Login')
    }, 2000)
  }

  componentWillUnmount() {
    this.watchId.remove()
  }

  locationChanged = location => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }

    this.setState({location, region})

    let currentDate = new Date(location.timestamp)

    var date = currentDate.getDate()
    var month = currentDate.getMonth() //Be careful! January is 0 not 1
    var year = currentDate.getFullYear()

    var hour = currentDate.getHours()
    var min = currentDate.getMinutes()
    var sec = currentDate.getSeconds()

    if (hour > 12) {
      hour = hour - 12
    }
    // console.log(time);

    var dateString = date + '-' + (month + 1) + '-' + year
    var timeString = hour + ':' + min + ':' + sec
    console.log(dateString)
    console.log(timeString)
    const loc = {
      empId: this.props.navigation.getParam('empId'),
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: dateString + ' ' + timeString,
    }
    if (this.state.insertData) {
      axios
        .post('https://fierce-scrubland-42898.herokuapp.com/userLocation', loc)
        .then(response => {})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          showsMyLocationButton={true}
          zoomEnabled={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.onStopTracking()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.bottomBarContent}>STOP TRACKING</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
})
