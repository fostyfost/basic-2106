import { Record, Set } from "immutable";
import { LOAD_LOCALE, START, SUCCESS } from "../constants";

const ReducerRecord = Record({
  entities: {},
  loading: new Set(),
  loaded: new Set()
});

export default (
  localesState = new ReducerRecord(),
  { type, payload: { localeCode } },
  response
) => {
  switch (type) {
    case LOAD_LOCALE + START:
      return localesState.updateIn(["loading"], loading =>
        loading.add(localeCode)
      );

    case LOAD_LOCALE + SUCCESS:
      return localesState
        .set("entities", { [localeCode]: response })
        .updateIn(["loading"], loading => loading.remove(localeCode))
        .updateIn(["loaded"], loading => loading.add(localeCode));

    /*
    return state.updateIn(
        ["entities", payload.restaurantId, "reviews"],
        reviews => reviews.concat(id)
      );
     */

    default:
      return localesState;
  }
};
