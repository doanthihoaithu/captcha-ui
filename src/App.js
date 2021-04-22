import React, { useEffect } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';
import Cookies from 'universal-cookie'
import { useSelector, useDispatch } from 'react-redux';
import routes from 'routes'
import * as actions from './services/redux/user/actions';
import Loader from 'components/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const browserHistory = createBrowserHistory();
const loading = () => <div className="animated fadeIn fast  pt-3 text-center">Loading...</div>;

const DefaultLayout = React.lazy(() => import('components/DefaultLayout'));
// const SignIn = React.lazy(() => import('components/SignIn'));
// const SignUp = React.lazy(() => import('components/SignUp'));
// const ForgetPassword = React.lazy(() => import('components/ForgetPassword'));

const cookies = new Cookies();

function cookieExpired() {
  var cookieAlive = cookies.get("leave") ? true : false;
  return !cookieAlive;
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = true;
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector(state => state.status.isLoading)
  // const [loggingStatus, updateLoggingStatus] = useState(cookies.get("leave") ? true : false);

  useEffect(() => {
    // updateLoggingStatus(cookies.get("leave") ? true : false);
    if (cookieExpired()) {
      dispatch(actions.logOut())
      // console.log("Log out");
    }
    else {
      dispatch(actions.logIn(cookies.get("leave")))
      // console.log("Log in");
    }
    // console.log(isAuthenticated)
  })

  return (
    <Router history={browserHistory}>
      <React.Suspense fallback={loading()}>
        <Switch>
          {routes.authenticationRoutes.map(route =>
            route.component ? (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={restProps => (!isAuthenticated ? <route.component {...restProps} title={route.name} /> : <Redirect to="/" />)}
              />
            ) : null,
          )}
          {/* <Route exact path="/signin" name="Sign In Page" render={() => (!isAuthenticated ? <SignIn /> : <Redirect to="/" />)}/>
          <Route exact path="/signup" name="Sign Up Page" render={() => (!isAuthenticated ? <SignUp /> : <Redirect to="/" />)}/>
          <Route exact path="/forget-password" name="Forget Password Page" render={() => (!isAuthenticated ? <ForgetPassword /> : <Redirect to="/" />)}/> */}
          {/* <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/403" name="Page 403" component={Page403} />
        <Route exact path="/500" name="Page 500" component={Page500} /> */}
          <Route path="/" extract={true} name="Home" render={() => (isAuthenticated ? <DefaultLayout /> : <Redirect to="/signin" />)} />
        </Switch>
      </React.Suspense>
      {isLoading ? <Loader /> : null}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      // toastClassName={"radius-toast my-shadow"}
      />
    </Router>
  );
}

export default App;
