import { fromJS, Map } from "immutable";
import { CREATE_NEW_USER_REVIEW } from "../constants";
import { withKeyValue } from "../utils";

const defaultState = new Map({
  entities: fromJS(withKeyValue([])),
  loading: false,
  error: null
});

export default (state = defaultState, { type, payload, id }) => {
  if (type === CREATE_NEW_USER_REVIEW) {
    return {
      ...state,
      [id]: {
        id,
        name: payload.userName
      }
    };
  }

  return state;
};
