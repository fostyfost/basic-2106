import { fromJS, Map } from "immutable";
import { withKeyValue } from "../utils";
import {
  CREATE_NEW_USER_REVIEW,
  ERROR,
  LOAD_ALL_RESTAURANTS,
  START,
  SUCCESS
} from "../constants";

const defaultState = new Map({
  entities: fromJS(withKeyValue([])),
  loading: true,
  error: null
});

export default (
  state = defaultState,
  { type, payload, id, restaurants, error }
) => {
  switch (type) {
    case CREATE_NEW_USER_REVIEW:
      return state.updateIn(
        ["entities", payload.restaurantId, "reviews"],
        reviews => reviews.push(id)
      );

    case LOAD_ALL_RESTAURANTS + START:
      return state.set("loading", true);

    case LOAD_ALL_RESTAURANTS + ERROR:
      return state.set("error", error).set("loading", false);

    case LOAD_ALL_RESTAURANTS + SUCCESS:
      return state
        .set("entities", fromJS(withKeyValue(restaurants)))
        .set("loading", false);

    default:
      return state;
  }
};
