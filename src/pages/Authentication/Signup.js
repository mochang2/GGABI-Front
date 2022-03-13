import PropTypes from "prop-types"
import React from "react"

// action
import { registerUser, apiError, registerUserFailed } from "../../store/actions"

// Redux
import { connect } from "react-redux"


// header, content, footer components
import HeaderInAuth from "../../components/Auth/Header/HeaderInAuth"
import SignupForm from "../../components/Auth/AuthDetails/SignupForm"
import FooterInAuth from "../../components/Auth/Footer/FooterInAuth"

const Signup = props => {

  return (
    <div className="signup-page-outer-wrapper" style={{backgroundColor: "#f8f8f8"}}>
      <HeaderInAuth />
      <SignupForm/>
      <FooterInAuth />
    </div>
  )
}

Signup.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account
  return { user, registrationError, loading }
}

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Signup)
