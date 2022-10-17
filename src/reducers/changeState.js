import { OPEN_SIDEBAR,OPEN_MOBILE_SIDEBAR } from "src/actions/types";

const initialState = {
  sidebarShow: 'responsive',
  asideShow: false,
  darkMode: false
};

export default function (state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarShow: action.sidebarShow,
      };
    case OPEN_MOBILE_SIDEBAR:
      return {
        ...state,
        sidebarShow: action.sidebarShow,
      };
    default:
      return state;
  }
}
