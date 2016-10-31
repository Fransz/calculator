/* eslint-disable no-unused-vars */
import {PropTypes} from "react";
import {Provider} from "react-redux";
import CalcReduxContainer from "./CalcReduxContainer";
/* eslint-enable no-unused-vars */

import {createStore} from "redux";

import reducer from "../../reducers/reducer";

const store = createStore(reducer);

function Calculator() {
    return (
        <Provider store={store}>
            <CalcReduxContainer />
        </Provider>
    );
}

export default Calculator;
