import React from "react";
import * as PropTypes from "prop-types";
import { Avatar, Button, List } from "antd";
import { idPropTypes } from "../utils";
import ReviewList from "./review-list";
import RestaurantMenu from "./restaurant-menu";
import RestaurantRate from "./restaurant-rate";
import NewReview from "./new-review";

const Restaurant = ({ restaurant, isOpen, onBtnClick }) => (
  <List.Item
    style={{ paddingLeft: "8px" }}
    actions={[
      <Button onClick={onBtnClick}>{isOpen ? "Hide menu" : "Show menu"}</Button>
    ]}
  >
    <List.Item.Meta
      avatar={<Avatar shape="square" src={restaurant.image} />}
      title={restaurant.name}
    />
    <RestaurantRate restaurantId={restaurant.id} />
    <NewReview restaurantId={restaurant.id} />
    {isOpen && (
      <div>
        <RestaurantMenu menu={restaurant.menu} />
        <ReviewList reviews={restaurant.reviews} />
      </div>
    )}
  </List.Item>
);

Restaurant.propTypes = {
  isOpen: PropTypes.bool,
  onBtnClick: PropTypes.func,
  restaurant: PropTypes.shape({
    id: idPropTypes,
    menu: PropTypes.array,
    reviews: PropTypes.array,
    image: PropTypes.string,
    name: PropTypes.string
  })
};

export default Restaurant;
