import {
  FLOWER_LIST,
  FLOWER_ADD,
  FLOWER_EDIT,
  FLOWER_DELETE,
  FLOWER_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case FLOWER_LIST:
      return {
        ...state,
        flowers: action.payload,
        loading: false
      };
    case FLOWER_ADD:
      return {
        ...state,
        flowers: [...state.flowers, action.payload],
        loading: false
      };
    case FLOWER_EDIT:
      return {
        ...state,
        flowers: state.flowers.map(flower =>
          flower._id === action.payload._id ? action.payload : flower
        ),
        loading: false
      };
    case FLOWER_DELETE:
      return {
        ...state,
        flowers: state.flowers.filter(flower => flower._id !== action.payload),
        loading: false
      };
    case FLOWER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
