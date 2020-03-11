import React from 'react';
import { useSelector } from 'react-redux';
import SignOut from './../SignOut';
import ProfilePicture from './../ProfilePicture'
import { Link } from 'react-router-dom'

function Home(props) {
    const username = useSelector(state => state.user.username);

    return (
        <div className="container-contact100 animated fadeIn fast ">
            <div className="d-flex flex-column align-items-center justify-content-center bg-white p-5">
                <div className="m-3"></div>
                <h3 className="text-success">Welcome back, <strong>{username}</strong></h3>
                <div className="m-3">
                    <ProfilePicture />
                </div>
                <div className="m-3">
                    <Link className="btn btn-info mx-5 home-btn" to="/change-password">Change Password</Link>
                    <SignOut />
                </div>
            </div>
        </div>
    )
}

export default Home;