import animationTrigger from 'helpers/loadingAnimationTrigger';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userServices } from 'services';
import Cookies from 'universal-cookie';
import * as actions from "../../services/redux/user/actions";
import { toast } from 'react-toastify'

const cookies = new Cookies();

export default () => {
    const username = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const [wrongAuthentication, updateWrongAuthentication] = useState(false);

    // const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    function signUserIn(username, password) {
        // console.log(_username, _password)
        animationTrigger.startLoading();
        let data = { username, password }
        userServices.signUserIn(data).then((res) => {
            // console.log(res.data);
            cookies.set('leave', {
                username: res.data.username,
                access_token: res.data.access_token,
                refresh_token: res.data.refresh_token
            }, {
                    expires: new Date(moment().add('1800', 'seconds'))
                })
            updateWrongAuthentication(false)
            dispatch(actions.logIn(res.data))
            animationTrigger.stopLoading();
            toast.success('Login successfully')
        }).catch(err => {
            console.log(err)
            updateWrongAuthentication(true)
            animationTrigger.stopLoading();
        })
    }

    function onFormSubmit(event) {
        event.preventDefault();

        // console.log(event.target)
        const valid = event.target.checkValidity();
        // console.log(valid)
        if (valid) {
            signUserIn(username.current.value, password.current.value);
        }
    }

    return (
        <div className="container-contact100 animated fadeIn fast ">
            <div className="wrap-contact100">
                <button className="btn-hide-contact100">
                    <i className="zmdi zmdi-close"></i>
                </button>

                <div className="contact100-form-title" style={{ backgroundImage: `url(${require('./../../asset/images/bg-02.jpg')})` }}>
                    <span>Sign In</span>
                </div>

                <form className="contact100-form validate-form" onSubmit={onFormSubmit}>
                    <div className="wrap-input100 validate-input">
                        <input pattern="^(?=.{6,150}$)[a-zA-Z0-9]+$" type="text" ref={username} className="input100" id="exampleInputUsername1" aria-describedby="usernameHelp" placeholder="Enter username" required />
                        <span className="focus-input100"></span>
                        <label className="label-input100" htmlFor="username">
                            <span className="lnr lnr-user m-b-2"></span>
                        </label>
                    </div>


                    <div className="wrap-input100 validate-input">
                        <input pattern="^(?=.{8,150}$)[a-zA-Z0-9]+$" type="password" ref={password} className="input100" id="exampleInputPassword1" placeholder="Password" required />
                        <span className="focus-input100"></span>
                        <label className="label-input100" htmlFor="password">
                            <span className="lnr lnr-lock m-b-5"></span>
                        </label>
                    </div>

                    <div className="text-danger w-100 text-center mb-1" hidden={!wrongAuthentication}>Incorrect username or password</div>

                    <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn" type="submit">
                            Sign In
    				    </button>
                    </div>
                </form>
                <div className="d-flex flex-column justify-content-center align-items-center mb-4">
                    <Link to="/forget-password" className="text-info">Forgot your password?</Link>
                    <div className="p-1">
                        <small>Don't have an account? </small><Link to="/signup" className="text-info">Create now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};
