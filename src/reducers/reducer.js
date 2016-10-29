"use strict";

var shuntingYard = require("shuntingyard").shuntingYard

export default function reducer(state = {}, action) {
    let newInput = input(state.input, action);
    let newExpr = expression(state.expression, newInput, action);
    let newValue = value(state.value, newExpr, newInput, action);

    if (action.type === "ADD_OPERATOR") {
        newInput = "0";
    }
    if (action.type === "CALCULATE") {
        newInput = "0";
    }


    return {
        input: newInput,
        expression: newExpr,
        value: newValue
    }
};


function input(inp = "0", action) {
    switch(action.type) {
        case "ADD_KEY":
            return (inp === "0" ? "" : inp) + action.key;

        case "CLEAR_KEYS":
            return "0";

        default:
            return inp;
    }
}

function expression(expr = [], inp, action) {
    switch (action.type) {
        case "ADD_OPERATOR":
            return shuntingYard(expr.join(' ') + ' ' + inp + ' ' + action.operator);
        case "CALCULATE":
            return shuntingYard(expr.join(' ') + ' ' + inp + ' ' + '=');
        default:
            return expr;
    }
}

function value(res = "0", expr, inp, action) {
    switch(action.type) {
        case "ADD_OPERATOR":
        case "CALCULATE":
            let r = 0;
            for(let i = 0; i < expr.length; i++) {
                if(typeof expr[i] === "number") {
                    r = expr[i];
                    continue;
                }
                break;
            }
            return r.toString();

        case "ADD_KEY":
        case "CLEAR_KEY":
            return inp;

        default:
            return res;
    }
}
