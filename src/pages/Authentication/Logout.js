import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

// axios api
import { axiosAPI } from '../../APIs/BaseAPI'

// link
import LinkTo from '../../routes/LinkTo'


const Logout = (props) => {
  useEffect(() => {
    axiosAPI.defaults.headers.common["Authorization"] = ""; // Token 지우기
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("JWTTokenExpireTime");
    localStorage.removeItem("user");
    localStorage.removeItem("authority");
    props.history.push(LinkTo.login);
  })

  return <></>
}

Logout.propTypes = {
  history: PropTypes.object,
}

export default withRouter(connect(null, null)(Logout))
