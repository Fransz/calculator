"use strict";

import { connect } from "react-redux";

import CalcContainer from "../CalcContainer";
import {addKey, addOperator, addParentheses, calculate, clearKeys} from "../../../actions";

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
            switch(operator) {
                case "=":
                    dispatch(calculate());
                    break;
                case "(":
                case ")":
                    dispatch(addParentheses(operator));
                    break;
                default:
                    dispatch(addOperator(operator));
                    break;
            }
        }
    };
};


const CalcReduxContainer = connect (
    mapStateToProps,
    mapDispatchToProps
)(CalcContainer);


export default CalcReduxContainer;
