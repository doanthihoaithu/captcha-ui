import { createStore } from 'redux';
import { rootReducer } from './../services';

const store = createStore(rootReducer);

export default store;
