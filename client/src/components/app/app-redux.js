import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CloudinaryContext } from 'cloudinary-react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { store } from '../../store'

import agent from '../../actions/actions-agent'
import Header from '../header'
import Home from '../routes/home'
import Post from '../routes/post'
import Editor from '../routes/editor'
import Login from '../routes/login'
import Profile from '../routes/profile'
import Favorites from '../routes/favorites'
import Register from '../routes/register'
import Settings from '../routes/settings'

import Config from '../../config'
import Styles from './app-styles'

import {
  APP_LOAD,
  AUTH_USER_LOGOUT,
  APP_REDIRECT_LOCATION
} from '../../actions/actions-types'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onClickLogout: () =>
    dispatch({ type: AUTH_USER_LOGOUT }),
  onRedirect: () =>
    dispatch({ type: APP_REDIRECT_LOCATION }),
})

class App extends React.Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo))
      this.props.onRedirect()
    }
  }

  UNSAFE_componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) agent.setToken(token)
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div className='App'>
          <CloudinaryContext
            cloudName={Config.CLOUD_NAME}
            uploadPreset={Config.CLOUD_PRESET}>
            <Header
              appName={this.props.appName}
              currentUser={this.props.currentUser}
              onClickLogout={this.props.onClickLogout} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/editor/:slug" component={Editor} />
              <Route path="/editor" component={Editor} />
              <Route path="/post/:id" component={Post} />
              <Route path="/settings" component={Settings} />
              <Route path="/@:username/favorites" component={Favorites} />
              <Route path="/@:username" component={Profile} />
            </Switch>
            <Styles />
          </CloudinaryContext>
        </div>
      )
    }
    return (
      <div className='App'>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <Styles />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)