import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { Input, Spin } from "antd";
import LocaleSelector from "./components/locale-selector";
import Cart from "./components/cart";
import Filter from "./components/filter";
import RestaurantsPage from "./components/routes/restaurants";
import CheckoutPage from "./components/routes/checkout";
import { Provider as UsernameProvider } from "./contexts/username";
import { Provider as LocaleProvider } from "./contexts/locale";
import { useInputValue } from "./custom-hooks/use-input-value";
import Menu, { MenuItem } from "./components/menu";
import {
  currentLocaleCodeSelector,
  localeLoadingSelector,
  localeSelector
} from "./selectors";
import { loadLocale } from "./ac";

const App = ({ currentLocaleCode, locale, loading, loadLocale }) => {
  const [username, setUserName] = useInputValue("Roma");

  useEffect(() => {
    if (!locale || !locale[currentLocaleCode]) {
      loadLocale(currentLocaleCode);
    }
  }, [loadLocale, currentLocaleCode, locale]);

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <LocaleProvider value={locale}>
        <LocaleSelector />
        <Menu>
          <Menu.Item to="/checkout">
            <Cart />
          </Menu.Item>
          <MenuItem to="/restaurants">
            {locale && locale["RESTAURANTS"]}
          </MenuItem>
          <MenuItem to="/filter" children={"Filter"} />
        </Menu>
        <div>
          Username: <Input value={username} onChange={setUserName} />
        </div>
        <UsernameProvider value={username}>
          <Switch>
            <Redirect from="/" exact to="/restaurants" />
            <Redirect from="/restaurants/" exact strict to="/restaurants" />
            <Route path="/filter" exact component={Filter} />
            <Route path="/checkout" exact component={CheckoutPage} />
            <Route
              path="/restaurants/:id/review"
              render={({ id }) => <h1>Add a review for {id}</h1>}
            />
            <Route path="/restaurants" component={RestaurantsPage} />
            <Route path="*" render={() => <h1>Not Found Page</h1>} />
          </Switch>
        </UsernameProvider>
      </LocaleProvider>
    </div>
  );
};

export default connect(
  (state, ownProps) => ({
    currentLocaleCode: currentLocaleCodeSelector(state),
    loading: localeLoadingSelector(state),
    locale: localeSelector(state, ownProps)
  }),
  { loadLocale }
)(App);
