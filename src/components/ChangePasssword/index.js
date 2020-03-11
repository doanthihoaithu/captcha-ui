import animationTrigger from 'helpers/loadingAnimationTrigger';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userServices } from 'services';

function ChangePassword(props) {
  const oldPassword = useRef(null);
  const newPassword = useRef(null);
  const newPasswordConfirm = useRef(null);

  const userData = useSelector(state => state.user);

  const [passwordChanged, changePasswordUpdatingStatus] = useState(false);
  const [newPasswordMatched, updatePasswordMatchingStatus] = useState(true);
  const [somethingWronged, changeSomethingWrongedStatus] = useState(false);

  function changePassword(_oldPassword, _newPassword, _newPasswordConfirm) {
    changeSomethingWrongedStatus(false);
    // console.log(_username, _email, _password)
    if (_newPassword === _newPasswordConfirm) {
      updatePasswordMatchingStatus(true);
      animationTrigger.startLoading();
      let data = { username: userData.username, old_password: _oldPassword, new_password: _newPassword };
      userServices.changePassword(data, userData.accessToken).then((res) => {
        console.log(res);

        changePasswordUpdatingStatus(true);
        changeSomethingWrongedStatus(false);
        animationTrigger.stopLoading()
      }).catch(err => {
        console.log(err)
        changeSomethingWrongedStatus(true);
        animationTrigger.stopLoading()
      })
    }
    else {
      updatePasswordMatchingStatus(false);
    }
  }

  function onFormSubmit(event) {
    event.preventDefault();
    const valid = event.target.checkValidity();
    // console.log(valid)
    if (valid) {
      changePassword(oldPassword.current.value, newPassword.current.value, newPasswordConfirm.current.value);
      // console.log("jsbfjbasf")
    }
  }

  return (
    <div className="container-contact100 animated fadeIn fast ">
      <div className="wrap-contact100">
        <button className="btn-hide-contact100">
          <i className="zmdi zmdi-close"></i>
        </button>

        <div className="contact100-form-title" style={{ backgroundImage: `url(${require('./../../asset/images/bg-02.jpg')})` }}>
          <span>Change Password</span>
        </div>
        {
          passwordChanged ? <SuccessfullyChangingPassword /> :
            <form id="changePasswordForm" className="contact100-form validate-form" onSubmit={onFormSubmit}>
              <div className="wrap-input100 validate-input">
                <input pattern="^(?=.{8,150}$)[a-zA-Z0-9]+$" type="password" ref={oldPassword} className="input100" id="oldPassword" aria-describedby="oldPasswordHelp" placeholder="Enter old password" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="oldPassword">
                  <span className="lnr lnr-lock m-b-2"></span>
                </label>
              </div>


              <div className="wrap-input100 validate-input">
                <input pattern="^(?=.{8,150}$)[a-zA-Z0-9]+$" type="password" ref={newPassword} className="input100" id="newPassword" placeholder="Enter new password" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="newPassword">
                  <span className="lnr lnr-cog m-b-5"></span>
                </label>
              </div>

              <div className="wrap-input100 validate-input">
                <input pattern="^(?=.{8,150}$)[a-zA-Z0-9]+$" type="password" ref={newPasswordConfirm} className="input100" id="confirmNewPassword" placeholder="Confirm new password" required />
                <span className="focus-input100"></span>
                <label className="label-input100" htmlFor="newPasswordConfirm">
                  <span className="lnr lnr-redo m-b-5"></span>
                </label>
              </div>

              <div className="w-100 text-center mb-1"><span className="text-danger" hidden={newPasswordMatched}>Password not matched. Please try again!</span></div>
              <div className="w-100 text-center mb-1"><span className="text-danger" hidden={!somethingWronged}>Something went wrong. Please try again!</span></div>

              <div className="container-contact100-form-btn">
                <button className="contact100-form-btn" type="submit">
                  Reset Password
                  </button>
              </div>
            </form>
        }
        <div className="d-flex flex-column justify-content-center align-items-center mb-4">
          <Link to="/" className="text-info">Back to Home</Link>
        </div>
      </div>
    </div>
  )
};

function SuccessfullyChangingPassword() {
  return (
    <div className="d-flex align-items-center justify-content-center m-5 flex-column">
      <h5 className="text-success text-center">Password has been changed successfully</h5>
      {/* <h4 className="text-success text-center">Thank you for using our services</h4> */}
    </div>
  )
}

export default ChangePassword;