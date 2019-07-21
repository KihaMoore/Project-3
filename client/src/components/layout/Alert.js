import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const Alert = ({alerts}) => alerts !== null && alerts.map(alert =>(
    <div key
))

Alert.propTypes = {
  alerts:PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts:state.alert
})
export default connect()(Alert);
