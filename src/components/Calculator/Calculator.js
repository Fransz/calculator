import React, { PropTypes } from "react";
import {Provider} from "react-redux"
import {createStore} from "redux"

import CalcReduxContainer from './CalcReduxContainer'
import reducer from "../../reducers/reducer"

const store = createStore(reducer);

function Calculator({ title }) {
  return (
        <Provider store={store}>
          <CalcReduxContainer title={title} />
        </Provider>
  );
}

Calculator.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Calculator;
