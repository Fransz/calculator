"use strict";

import { connect } from "react-redux";

import CalcContainer from "../CalcContainer";
import {addKey, addOperator, addParentheses, calculate, clearKeys, clearAll} from "../../../actions";

const mapStateToProps = (state) => {
    return {
        displayValue: state.value
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        keyHandler: (key) => {
            switch(key) {
                case "ce":
                    dispatch(clearKeys());
                    break;
                default:
                    dispatch(addKey(key));
                    break;
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
                case "c":
                    dispatch(clearAll());
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
