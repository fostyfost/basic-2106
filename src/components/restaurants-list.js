import React, { useEffect } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { List } from "antd";
import Restaurant from "./restaurant";
import accordionDecorator from "../decorators/accordion";
import {
  restaurantsLoadingStartSelector,
  filtratedRestaurantsSelector
} from "../selectors";
import { loadAllRestaurants } from "../ac";
import { idPropTypes } from "../utils";

const RestaurantsList = ({
  loading,
  restaurants,
  toggleOpenItem,
  isItemOpen,
  loadAllRestaurants
}) => {
  useEffect(() => {
    loadAllRestaurants();
  }, [loadAllRestaurants]);

  return (
    <List
      loading={loading}
      dataSource={restaurants}
      renderItem={restaurant => (
        <Restaurant
          key={restaurant.id}
          restaurant={restaurant}
          isOpen={isItemOpen(restaurant.id)}
          onBtnClick={toggleOpenItem(restaurant.id)}
        />
      )}
    />
  );
};

RestaurantsList.propTypes = {
  loading: PropTypes.bool,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: idPropTypes
    })
  ),
  toggleOpenItem: PropTypes.func,
  isItemOpen: PropTypes.func,
  loadAllRestaurants: PropTypes.func
};

// noinspection JSUnusedGlobalSymbols
RestaurantsList.defaultProps = {
  loading: true,
  restaurants: [],
  toggleOpenItem: () => null,
  isItemOpen: () => null,
  loadAllRestaurants: () => null
};

const mapStateToProps = state => ({
  loading: restaurantsLoadingStartSelector(state),
  restaurants: filtratedRestaurantsSelector(state)
});

const mapDispatchToProps = {
  loadAllRestaurants
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(accordionDecorator(RestaurantsList));
