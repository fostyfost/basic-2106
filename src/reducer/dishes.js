import { fromJS, Map } from "immutable";
import { withKeyValue } from "../utils";

const defaultState = new Map({
  entities: fromJS(withKeyValue([])),
  loading: false,
  error: null
});

export default (state = defaultState) => {
  return state;
};
