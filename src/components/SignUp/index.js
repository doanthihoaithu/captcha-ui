import animationTrigger from 'helpers/loadingAnimationTrigger';
import React, { useRef, useState } from 'react';
import { userServices } from 'services';
import { Link } from 'react-router-dom'

function SignUp(props) {
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);

  const [registered, changeRegistrationStatus] = useState(false);
  const [somethingWronged, changeSomethingWrongedStatus] = useState(false);

  function registerNewUser(username, email, password, fullname) {
    animationTrigger.startLoading();
    let data = { username, email, password, fullname };
    // console.log(_username, _email, _password)
    userServices.registerNewUser(data).then((res) => {
      console.log(res);

      changeRegistrationStatus(true);
      changeSomethingWrongedStatus(false);
      animationTrigger.stopLoading()
    }).catch(err => {
      console.log(err)
      changeSomethingWrongedStatus(true);
      animationTrigger.stopLoading()
    })
  }

  function onFormSubmit(event) {
    event.preventDefault();

    const valid = event.target.checkValidity();
    // console.log(valid)
    if (valid) {
      registerNewUser(username.current.value, email.current.value, password.current.value, fullname.current.value);
    }
  }

  return (
    <div className="container-contact100 animated fadeIn fast ">
      <div className="wrap-contact100">
        <button className="btn-hide-contact100">
          <i className="zmdi zmdi-close"></i>
        </button>

        <div className="contact100-form-title" style={{ backgroundImage: `url(${require('./../../asset/images/bg-02.jpg')})` }}>
          <span>Create new account</span>
        </div>

        {
          registered ? <SuccessfulRegistration /> :
            <form className="contact100-form validate-form" onSubmit={onFormSubmit}>
              <div className="wrap-input100 validate-input">
                <input pattern="^(?=.{6,150}$)[a-zA-Z0-9]+$" type="text" ref={username} className="input100" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="username">
                  <span className="lnr lnr-user m-b-2"></span>
                </label>
              </div>

              <div className="wrap-input100 validate-input">
                <input id="name" ref={fullname} className="input100" type="text" placeholder="Full name" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="name">
                  <span className="lnr lnr-user m-b-2"></span>
                </label>
              </div>

              <div className="wrap-input100 validate-input">
                <input type="email" ref={email} className="input100" id="exampleEmail1" placeholder="Email" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="email">
                  <span className="lnr lnr-envelope m-b-5"></span>
                </label>
              </div>

              <div className="wrap-input100 validate-input">
                <input pattern="^(?=.{8,150}$)[a-zA-Z0-9]+$" type="password" ref={password} className="input100" id="exampleInputPassword1" placeholder="Password" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="password">
                  <span className="lnr lnr-lock m-b-5"></span>
                </label>
              </div>

              <div className="w-100 text-center mb-1"><span className="text-danger" hidden={!somethingWronged}>Something went wrong. Please try again!</span></div>

              <div className="container-contact100-form-btn">
                <button className="contact100-form-btn" type="submit">
                  Create account
            </button>
              </div>
            </form>
        }

        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
          <div className="">
            <small>Already have an account? </small><Link to="/signin" className="text-info">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

function SuccessfulRegistration() {
  return (
    <div className="d-flex align-items-center justify-content-center m-5 flex-column">
      <h4 className="text-success text-center">You have successfully registered </h4>
    </div>
  )
}

export default SignUp;