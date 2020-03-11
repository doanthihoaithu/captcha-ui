import animationTrigger from 'helpers/loadingAnimationTrigger';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { userServices } from 'services';

function ForgetPassword(props) {
    const username = useRef(null);
    const email = useRef(null);

    const [resetPasswordRequestSucceeded, changeResetPasswordRequestStatus] = useState(false);
    const [somethingWronged, changeSomethingWrongedStatus] = useState(false);

    function requestResetPassword(username, email) {
        animationTrigger.startLoading();
        let data = { username, email }
        userServices.resetPassword(data).then((res) => {
            console.log(res);
            changeResetPasswordRequestStatus(true);
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
            requestResetPassword(username.current.value, email.current.value);
        }
    }

    return (
        <div className="container-contact100 animated fadeIn fast ">
            <div className="wrap-contact100">
                <button className="btn-hide-contact100">
                    <i className="zmdi zmdi-close"></i>
                </button>

                <div className="contact100-form-title" style={{ backgroundImage: `url(${require('./../../asset/images/bg-02.jpg')})` }}>
                    <span>Forgot Password</span>
                </div>
                {
                    resetPasswordRequestSucceeded ? <SuccessfulRegistration /> :
                        <form className="contact100-form validate-form" onSubmit={onFormSubmit}>
                            <div className="wrap-input100 validate-input">
                                <input pattern="^(?=.{6,150}$)[a-zA-Z0-9]+$" type="text" ref={username} className="input100" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" required />
                                <span className="focus-input100"></span>
                                <label className="label-input100" htmlFor="username">
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

                            <div className="w-100 text-center mb-1"><span className="text-danger" hidden={!somethingWronged}>Incorrect username or email. Please try again!</span></div>

                            <div className="container-contact100-form-btn">
                                <button className="contact100-form-btn" type="submit">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                }
                <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                    <Link to="/signin" className="text-info">Signin with your account</Link>
                    <div className="p-1">
                        <small>Don't have an account? </small><Link to="/signup" className="text-info">Create now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

function SuccessfulRegistration() {
    return (
        <div className="d-flex align-items-center justify-content-center m-5 flex-column">
            <h3 className="text-success text-center">Your password was successfully reset</h3>
        </div>
    )
}

export default ForgetPassword;