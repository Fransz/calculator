/* eslint-disable no-unused-vars */
import {PropTypes} from "react";
import {Provider} from "react-redux";
import CalcReduxContainer from "./CalcReduxContainer";
/* eslint-enable no-unused-vars */

import {createStore} from "redux";

import reducer from "../../reducers/reducer";

const store = createStore(reducer);

function Calculator({title}) {
    return (
        <Provider store={store}>
            <CalcReduxContainer title={title} />
        </Provider>
    );
}

Calculator.propTypes = {
    title: PropTypes.string.isRequired
};

export default Calculator;
