// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ipcRenderer } from 'electron'
import ipcFrontend from '../utils/ipcFrontend'


class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    ipcFrontend(dispatch)
  }

  render() {
    const { location, children } = this.props
    return (
      <div className="app">
        {children}
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

App.defaultProps = {
  location: ''
}

const mapStateToProps = state => {
  return {
    location: state.router.location.pathname,
    ipcEvents: state.ipc.events
  }
}

export default connect(mapStateToProps)(App)
