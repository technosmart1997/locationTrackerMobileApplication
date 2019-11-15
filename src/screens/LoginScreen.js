import React from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {Constants} from 'expo'
import axios from 'axios'
import Loader from './Loader'

export class LoginScreen extends React.Component {
  state = {
    loading: false,
    empId: '',
    pass: '',
    loggedIn: false,
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading}></Loader>
        <TextInput
          style={styles.input}
          value={this.state.empId}
          onChangeText={empId => this.setState({empId})}
          ref={ref => {
            this._nameInput = ref
          }}
          placeholder="Employee ID"
          autoFocus={true}
          autoCapitalize="words"
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={this._next}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.input}
          value={this.state.pass}
          onChangeText={pass => this.setState({pass})}
          ref={ref => {
            this._emailInput = ref
          }}
          placeholder="password"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="send"
          blurOnSubmit={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this._submit()}
        >
          <Text style={styles.submitButtonText}>Please Login !</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _next = () => {
    this._emailInput && this._emailInput.focus()
  }

  _submit = () => {
    let user = {}
    user.empId = this.state.empId
    user.password = this.state.pass

    console.log(this.state.empId)

    console.log('Correct')
    this.setState({
      loading: true,
    })

    axios
      .post('https://fierce-scrubland-42898.herokuapp.com/empLogin', user)
      .then(response => {
        if (response.data.status) {
          this.setState({
            loggedIn: true,
          })

          setTimeout(() => {
            this.setState({
              loading: false,
            })
            this.props.navigation.navigate('Home', {
              empId: this.state.empId,
            })
          }, 2000)
        }
      })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20,
    backgroundColor: '#336699',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 20,
    borderRadius: 4,
    height: 40,
    alignContent: 'center',
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: 'white',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  btn: {
    margin: 20,
    marginBottom: 0,
    marginTop: 30,
    height: 34,

    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
})
