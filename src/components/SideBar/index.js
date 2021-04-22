import animationTrigger from 'helpers/loadingAnimationTrigger';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userServices } from 'services';
import * as actions from "../../services/redux/user/actions";
import "./SideBar.css";

const MenuLink = ({ label, to, activeOnlyWhenExact, faIcon }) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
            const active = match ? 'category-select' : '';
            return (
              <li className={`${active} py-2`}>
                <Link to={to}>
                  <i className={`fa fa-2x ${faIcon}`} />
                  <span className="nav-text">
                    {label}
                  </span>
                </Link>
              </li>
            )
        }}
      />
    )
}

const SideBar = (props) => {
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
      <nav className="main-menu expanded">
        <ul>
          <MenuLink
            label="Analysis"
            to="/"
            activeOnlyWhenExact
            faIcon="fa-chart-bar"
          />
           <MenuLink
            label="Captcha Generator"
            to="/generate"
            activeOnlyWhenExact
            faIcon="fa-cogs"
          />
        </ul>
        <ul className="logout">
          <li onClick={signUserOut}>
            <a href="#root">
              <i className="fa fa-power-off fa-2x" />
              <span className="nav-text">
                            Đăng xuất
              </span>
            </a>
          </li>
        </ul>
      </nav>
    );
}

export default SideBar;