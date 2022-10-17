import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers";

const initialState = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false
}
const middleware = [thunk];

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

// const store = createStore(changeState)
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleware)));
export default store
