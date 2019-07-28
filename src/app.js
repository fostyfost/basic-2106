import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { Input, Radio, Spin } from "antd";
import Cart from "./components/cart";
import Filter from "./components/filter";
import RestaurantsPage from "./components/routes/restaurants";
import CheckoutPage from "./components/routes/checkout";
import { Provider as UsernameProvider } from "./contexts/username";
import { Provider as LocaleProvider } from "./contexts/locale";
import { useInputValue } from "./custom-hooks/use-input-value";
import Menu, { MenuItem } from "./components/menu";
import {
  localeLoadedSelector,
  localeLoadingSelector,
  localeSelector
} from "./selectors";
import { loadLocale } from "./ac";

const defaultLocaleCode = "ru";

/*const loadLocale = async lang => {
  try {
    const data = await fetch(`/locale/${lang}.json`);
    return await data.json();
  } catch (error) {
    console.warn(error);
    return {};
  }
};*/

const App = ({ translation, loaded, loading, loadLocale }) => {
  const [username, setUserName] = useInputValue("Roma");
  const [localeCode, setLocaleCode] = useInputValue(defaultLocaleCode);

  useEffect(() => {
    if (!loaded && !loading) {
      loadLocale({ localeCode });
    }
  }, [loadLocale, loaded, loading, localeCode]);

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <LocaleProvider value={translation}>
        <Radio.Group value={localeCode} size="small" onChange={setLocaleCode}>
          <Radio.Button value="ru">Русский</Radio.Button>
          <Radio.Button value="en">English</Radio.Button>
        </Radio.Group>
        <Menu>
          <Menu.Item to="/checkout">
            <Cart />
          </Menu.Item>
          <MenuItem to="/restaurants">Restaurants</MenuItem>
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
    loading: localeLoadingSelector(state, ownProps),
    loaded: localeLoadedSelector(state, ownProps),
    translation: localeSelector(state, "ru")
  }),
  { loadLocale }
)(App);
