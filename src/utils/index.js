import * as PropTypes from "prop-types";

export const idPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
]).isRequired;

export function withKeyValue(array = []) {
  return array.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item
    }),
    {}
  );
}
