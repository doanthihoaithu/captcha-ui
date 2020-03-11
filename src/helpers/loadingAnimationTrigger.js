import * as statusActions from "./../services/redux/status/actions";
import { store } from "./../services"

const animationTrigger =  {
    startLoading: function() {
        store.dispatch(statusActions.startLoading())
    },
    stopLoading: function() {
        store.dispatch(statusActions.stopLoading())
    }
}

export default animationTrigger