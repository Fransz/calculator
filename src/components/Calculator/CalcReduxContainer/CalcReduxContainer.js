"use strict";

import { connect } from "react-redux";

import CalcContainer from "../CalcContainer";
import {addKey, addOperator, calculate, clearKeys} from "../../../actions";

const mapStateToProps = (state) => {
    return {
        displayValue: state.value
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        keyHandler: (key) => {
            if(key === "ce") {
                dispatch(clearKeys());
            } else {
                dispatch(addKey(key));
            }
        },

        opHandler: (operator) => {
            if(operator === "=") {
                dispatch(calculate());
            } else {
                dispatch(addOperator(operator));
            }
        }
    };
};


const CalcReduxContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(CalcContainer);


export default CalcReduxContainer;
