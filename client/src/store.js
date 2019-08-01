import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//create a variable called initial state which is just going to be an empty object.
//all of our initial state will be in the reduces 
const initialState = {};

//and then we're going to create a variable called middleware
//and set that to an array.

const middleware = [thunk];

//create a variable called store set that to create store which we brought in from redux.
const store = createStore(
    rootReducer, 
    initialState,
    // since we're using the dev tools extension we can actually do use that compose with dev tools and
    //then that takes in the apply middleware and inside apply middleware we just use the spread operator
    //and and add that middleware variable that we created.
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
    