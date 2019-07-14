import React, { Fragment } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { addItem, removeItem } from "../ac";
import { dishSelector } from "../selectors";
import { idPropTypes } from "../utils";

const Dish = ({ dish, amount, handleDecrease, handleIncrease }) => (
  <Card
    bordered
    actions={[
      `$${dish.price}`,
      <Fragment>
        <span style={{ margin: "0 12px" }}>{amount}</span>
        <Button.Group>
          <Button
            type="primary"
            shape="circle"
            icon="minus"
            onClick={() => handleDecrease(dish.id)}
          />
          <Button
            type="primary"
            shape="circle"
            icon="plus"
            onClick={() => handleIncrease(dish.id)}
          />
        </Button.Group>
      </Fragment>
    ]}
  >
    <Card.Meta title={dish.name} description={dish.ingredients.join(", ")} />
  </Card>
);

Dish.propTypes = {
  handleDecrease: PropTypes.func.isRequired,
  handleIncrease: PropTypes.func.isRequired,
  dish: PropTypes.shape({
    id: idPropTypes,
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string)
  }),
  amount: PropTypes.number
};

Dish.defaultProps = {
  dish: PropTypes.shape({
    name: "Unknown",
    price: 0,
    ingredients: []
  }),
  amount: 0
};

const mapStateToProps = (state, ownProps) => ({
  amount: state.order[ownProps.id] || 0,
  dish: dishSelector(state, ownProps)
});

const mapDispatchToProps = {
  handleIncrease: addItem,
  handleDecrease: removeItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dish);
