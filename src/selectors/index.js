import { createSelector } from "reselect";

export const restaurantsSelector = state =>
  state.restaurants.get("entities").toJS();

export const restaurantsLoadingStartSelector = state =>
  state.restaurants.get("loading");

export const filtersSelector = state => state.filters;

export const dishesSelector = state => state.dishes.get("entities").toJS();

export const dishSelector = (state, { id }) => dishesSelector(state)[id];

export const reviewsSelector = state => state.reviews.get("entities").toJS();

export const usersSelector = state => state.users;

export const totalAmountSelector = state =>
  Object.values(state.order).reduce((acc, amount) => acc + amount, 0);

export const totalPriceSelector = state =>
  Object.entries(state.order).reduce(
    (acc, [id, amount]) => acc + dishSelector(state, { id }).price * amount,
    0
  );

export const reviewsWithUsersSelector = createSelector(
  reviewsSelector,
  usersSelector,
  (reviews, users) =>
    Object.values(reviews).reduce((acc, review) => {
      const user = users[review.userId];

      return {
        ...acc,
        [review.id]: {
          ...review,
          userName: (user && user.name) || "Unknown"
        }
      };
    }, {})
);

export const reviewWithUserSelector = (state, id) => {
  const reviews = reviewsWithUsersSelector(state);

  return (reviews && reviews[id]) || {};
};

export const restaurantsAverageRatingSelector = createSelector(
  restaurantsSelector,
  reviewsSelector,
  (restaurants, reviews) =>
    Object.values(restaurants).reduce((acc, restaurant) => {
      if (!restaurant.reviews || restaurant.reviews.length === 0) {
        return acc;
      }

      const averageRating = restaurant.reviews
        .map(reviewId => reviews[reviewId])
        .map(review => Math.max((review && review.rating) || 0, 0))
        .reduce(
          (averageValue, rating, _, ratings) =>
            averageValue + rating / ratings.length,
          0
        );

      return {
        ...acc,
        [restaurant.id]: Math.floor(averageRating)
      };
    }, {})
);

export const restaurantAverageRatingSelector = (state, id) => {
  const ratings = restaurantsAverageRatingSelector(state);

  return (ratings && ratings[id]) || 0;
};

export const filtratedRestaurantsSelector = createSelector(
  restaurantsSelector,
  restaurantsAverageRatingSelector,
  filtersSelector,
  (restaurants, ratings, filters) =>
    Object.values(restaurants).filter(
      restaurant => ratings[restaurant.id] >= filters.minRating
    )
);
