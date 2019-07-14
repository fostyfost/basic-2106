import * as PropTypes from "prop-types";
import { OrderedMap } from "immutable";

export const idPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]).isRequired;

export const arrToMap = (arr, Model) =>
  arr.reduce(
    (acc, item) => acc.set(item.id, new Model(item)),
    new OrderedMap({})
  );
