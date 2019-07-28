import React from "react";
import { connect } from "react-redux";
import { Radio } from "antd";
import { setCurrentLocaleCode } from "../ac";
import { currentLocaleCodeSelector } from "../selectors";

const LocaleSelector = ({ currentLocaleCode, setCurrentLocaleCode }) => (
  <Radio.Group
    value={currentLocaleCode}
    size="small"
    onChange={evt => setCurrentLocaleCode(evt.target.value)}
  >
    <Radio.Button value="ru">Русский</Radio.Button>
    <Radio.Button value="en">English</Radio.Button>
  </Radio.Group>
);

const mapStateToProps = state => ({
  currentLocaleCode: currentLocaleCodeSelector(state)
});

export default connect(
  mapStateToProps,
  { setCurrentLocaleCode }
)(LocaleSelector);
