import SignIn from 'components/SignIn'
import SignUp from 'components/SignUp'
import ChangePassword from 'components/ChangePasssword'
import ForgetPassword from 'components/ForgetPassword'
import Home from 'components/Home'
import Analysis from 'components/Analysis'
import CaptchaGenerator from 'components/Analysis/CaptchaGenerator'

const routes = {
    appRoutes: [
        { path: '/', exact: true, name: 'Analysis', component: Analysis },
        { path: '/generate', exact: true, name: 'Generate', component: CaptchaGenerator },
    ],
    authenticationRoutes: [
        { path: '/signin', exact: true, name: 'SignIn', component: SignIn },
        { path: '/signup', exact: true, name: 'SignUp', component: SignUp },
        { path: '/forget-password', exact: true, name: 'ForgetPassword', component: ForgetPassword }
    ]
};

export default routes;

