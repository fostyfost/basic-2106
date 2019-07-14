import { fromJS, Map } from "immutable";
import { withKeyValue } from "../utils";
import {
  CREATE_NEW_USER_REVIEW,
  ERROR,
  LOAD_RESTAURANTS_REVIEWS,
  START,
  SUCCESS

  // GET_REVIEW_BY_ID,
} from "../constants";

const defaultState = new Map({
  entities: fromJS(withKeyValue([])),
  loading: false,
  error: null
});

export default (
  state = defaultState,
  { type, payload, id, userId, reviews, error }
) => {
  switch (type) {
    case CREATE_NEW_USER_REVIEW:
      return state.updateIn(
        ["entities", payload.restaurantId, "reviews"],
        reviews => reviews.push(id)
      );

    case LOAD_RESTAURANTS_REVIEWS + START:
      return state.set("loading", true);

    case LOAD_RESTAURANTS_REVIEWS + ERROR:
      return state.set("loading", false).set("error", error);

    case LOAD_RESTAURANTS_REVIEWS + SUCCESS:
      return state
        .set("loading", false)
        .set("entities", fromJS(withKeyValue(reviews)));

    default:
      return state;
  }

  /*if (type === CREATE_NEW_USER_REVIEW) {
    return {
      ...reviews,
      [id]: {
        ...payload.review,
        id
      }
    };
  }

  return reviews;*/
};
