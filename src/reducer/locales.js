import { Record } from "immutable";
import { SET_CURRENT_LOCALE, LOAD_LOCALE, START, SUCCESS } from "../constants";

const ReducerRecord = Record({
  entities: {},
  currentLocaleCode: "ru",
  loading: false
});

export default (state = new ReducerRecord(), { type, payload }, response) => {
  switch (type) {
    case SET_CURRENT_LOCALE:
      return state.set("currentLocaleCode", payload.localeCode);

    case LOAD_LOCALE + START:
      return state.set("loading", true);

    case LOAD_LOCALE + SUCCESS:
      return state
        .set("entities", { [payload.localeCode]: response })
        .set("loading", false);

    default:
      return state;
  }
};
