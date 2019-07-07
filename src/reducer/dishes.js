import { normalizedDishes } from "../fixtures";

const defaultDishes = normalizedDishes.reduce(
  (acc, item) => ({
    ...acc,
    [item.id]: item
  }),
  {}
);

export default (dishes = defaultDishes) => {
  return dishes;
};
