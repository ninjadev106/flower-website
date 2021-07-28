import { USER_LIST } from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};
