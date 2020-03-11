import SignIn from 'components/SignIn'
import SignUp from 'components/SignUp'
import ChangePassword from 'components/ChangePasssword'
import ForgetPassword from 'components/ForgetPassword'
import Home from 'components/Home'

const routes = {
    appRoutes: [
        { path: '/', exact: true, name: 'Home', component: Home },
        { path: '/change-password', exact: true, name: 'Change Password', component: ChangePassword }, 
    ],
    authenticationRoutes: [
        { path: '/signin', exact: true, name: 'SignIn', component: SignIn },
        { path: '/signup', exact: true, name: 'SignUp', component: SignUp },
        { path: '/forget-password', exact: true, name: 'ForgetPassword', component: ForgetPassword }    
    ]
};

export default routes;

