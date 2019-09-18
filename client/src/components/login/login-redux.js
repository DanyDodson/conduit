import { Link } from 'react-router-dom'
import Errors from '../errors'
import React from 'react'
import agent from '../../middleware/middle-agent'
import { connect } from 'react-redux'
import { Wrap } from './login-styles'

import {
  LOGIN_FORM_LOADED,
  AUTH_USER_LOGIN,
  AUTH_UPDATE_FIELD,
  LOGIN_FORM_UNLOADED
} from '../../constants'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: LOGIN_FORM_LOADED }),
  onChangeEmail: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: AUTH_USER_LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_FORM_UNLOADED }),
})

class Login extends React.Component {
  constructor() {
    super()
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.submitForm = (email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(email, password)
    }
  }

  UNSAFE_componentWillMount() {
    this.props.onLoad()
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    const email = this.props.email
    const password = this.props.password
    return (
      <Wrap>
        <h1 className="text-xs-center">Sign In</h1>
        <p className="text-xs-center">
          <Link to="/register">Need an account?</Link>
        </p>

        <Errors errors={this.props.errors} />

        <form onSubmit={this.submitForm(email, password)}>
          <fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="email"
                placeholder="Email"
                value={email}
                onChange={this.changeEmail} />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.changePassword} />
            </fieldset>

            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={this.props.inProgress}>
              Sign in
                  </button>

          </fieldset>
        </form>
      </Wrap>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
