import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userServices } from 'services';
import * as actions from "../../services/redux/user/actions";
import animationTrigger from 'helpers/loadingAnimationTrigger';
import { toast } from 'react-toastify';

function SignOut(props) {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.user.accessToken);

    function signUserOut() {
        animationTrigger.startLoading();
        userServices.signUserOut(accessToken).then(res => {
            // console.log(res);
            animationTrigger.stopLoading();
            dispatch(actions.logOut());
            toast.success("Logout successful");
        }).catch(err => {
            // console.log(err);
            animationTrigger.stopLoading();
        })
    }

    return (
        <button className="btn btn-danger mx-5 home-btn" onClick={signUserOut}>Sign Out</button>
    )
}

export default SignOut