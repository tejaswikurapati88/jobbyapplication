import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

class LoginForm extends Component {
  state = {
    inpUserName: '',
    inpPass: '',
    errorMsg: '',
    showError: false,
  }

  onUserinp = event => {
    this.setState({inpUserName: event.target.value})
  }

  onUserpass = event => {
    this.setState({inpPass: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    let {inpUserName, inpPass} = this.state
    if (inpUserName === 'tejaswi') {
      inpUserName = 'rahul'
    }
    if (inpPass === 'teju@2022') {
      inpPass = 'rahul@2021'
    }
    const userDetails = {username: inpUserName, password: inpPass}

    console.log(JSON.stringify(userDetails))
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {inpUserName, inpPass, errorMsg, showError} = this.state
    return (
      <div>
        {Cookies.get('jwt_token') !== undefined ? (
          <Redirect to="/" />
        ) : (
          <div className="bg-login-container">
            <div className="login-sub-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="logo"
              />
              <form onSubmit={this.submitForm} className="form-container">
                <div className="input-container">
                  <label className="label" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    onChange={this.onUserinp}
                    type="text"
                    className="input"
                    placeholder="tejaswi"
                    id="username"
                    value={inpUserName}
                  />
                </div>
                <div className="input-container">
                  <label className="label" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    onChange={this.onUserpass}
                    type="password"
                    className="input"
                    placeholder="teju@2022"
                    id="password"
                    value={inpPass}
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showError && <p className="error">*{errorMsg}</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default LoginForm
