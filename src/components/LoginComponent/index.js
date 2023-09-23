import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {usernameInput: '', passwordInput: '', errorMsg: '', isError: false}

  PasswordInputValue = e => {
    this.setState({passwordInput: e.target.value})
  }

  UsernameInputValue = e => {
    this.setState({usernameInput: e.target.value})
  }

  onSubmitLogin = async e => {
    e.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {username: usernameInput, password: passwordInput}
    const option = {method: 'POST', body: JSON.stringify(userDetails)}
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
      this.setState({isError: false})
    } else {
      this.setState({errorMsg: data.error_msg, isError: true})
    }
  }

  render() {
    const {errorMsg, isError} = this.state

    return (
      <div className="Container">
        <div className="top">
          <img
            className="logo"
            src="https://res.cloudinary.com/dn0evywtq/image/upload/v1694616864/qyinbzpzwcfmbtg97nsl.png"
            alt="logo"
          />
        </div>
        <div className="center">
          <h1>Login</h1>
          <form onSubmit={this.onSubmitLogin}>
            <div className="inputContainer">
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.UsernameInputValue}
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.PasswordInputValue}
              />
            </div>
            {isError && <p className="error">{errorMsg}</p>}
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
