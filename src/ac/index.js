import {
  ADD_ITEM,
  CREATE_NEW_USER_REVIEW,
  ERROR,
  LOAD_ALL_RESTAURANTS,
  LOAD_RESTAURANTS_REVIEWS,
  REMOVE_ITEM,
  SET_MIN_RATING,
  START,
  SUCCESS
} from "../constants";

export const addItem = id => ({
  type: ADD_ITEM,
  payload: { id }
});

export const removeItem = id => ({
  type: REMOVE_ITEM,
  payload: { id }
});

export const setMinRating = minRating => ({
  type: SET_MIN_RATING,
  payload: { minRating }
});

export const createNewUserReview = ({
  restaurantId,
  userName,
  text,
  rating
}) => ({
  type: CREATE_NEW_USER_REVIEW,
  payload: { restaurantId, userName, text, rating },
  generateId: true
});

export const loadAllRestaurants = () => async dispatch => {
  let restaurants = [];

  try {
    dispatch({ type: LOAD_ALL_RESTAURANTS + START });

    const rawRestaurantsResponse = await fetch("/api/restaurants");

    restaurants = await rawRestaurantsResponse.json();

    dispatch({ type: LOAD_ALL_RESTAURANTS + SUCCESS, restaurants });
  } catch (error) {
    dispatch({ type: LOAD_ALL_RESTAURANTS + ERROR, error });
  }

  try {
    let reviewsIds = restaurants
      .reduce((acc, restaurant) => [].concat(acc, restaurant.reviews), [])
      .join(",");

    const rawReviewsResponse = await fetch(`/api/reviews?ids=${reviewsIds}`);
    const reviews = await rawReviewsResponse.json();

    dispatch({ type: LOAD_RESTAURANTS_REVIEWS + SUCCESS, reviews });
  } catch (error) {
    dispatch({ type: LOAD_RESTAURANTS_REVIEWS + ERROR, error });
  }
};
