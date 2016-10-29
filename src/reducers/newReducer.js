"use strict";

var shuntingYard = require("../shuntingyard").shuntingYard;
var rpn = require("../shuntingyard").rpn;

export default function reducer(state = {}, action) {
    let newInput = input(state.input, state.lastActionType, action);
    let newValue = value(state.value, newInput, action);

    if (action.type === "CALCULATE") {
        newInput = [ newValue ];
    }

    return {
        input: newInput,
        value: newValue,
        lastActionType: action.type
    }
};

function input(inp = [""], last="", action) {
    switch(action.type) {
        case "ADD_OPERATOR":
            if(last === "") {
              inp[inp.length - 1] = "0";
            }
            inp[inp.length] = action.operator;
            return inp;

        case "ADD_KEY":
            if(last === "ADD_KEY" || last === "CLEAR_KEYS" || last === "") {
                inp[inp.length - 1] += action.key;
            } else if(last === "ADD_OPERATOR") {
                inp[inp.length] = action.key;
            } else {
                inp[inp.length - 1] = action.key;
            }
            return inp;

        case "CLEAR_KEYS":
            inp[inp.length - 1] = "";
            return inp;

        case "CALCULATE":
            return inp;

        default:
            return inp;
    }
}

function value(val = "0", inp, action) {
    function getWhileNumber(ss) {
        let r = 0;
        for(let i = 0; i < ss.length; i++) {
            if(typeof ss[i] === "number") {
                r = ss[i];
                continue;
            }
            break;
        }
        return r.toString();
    }

    switch (action.type) {
        case "ADD_OPERATOR":
            return getWhileNumber(shuntingYard(inp.join(' ')));

        case "CALCULATE":
            return getWhileNumber(rpn(shuntingYard(inp.join(' '))));

        case "CLEAR_KEYS":
            return inp[inp.length - 1];

        case "ADD_KEY":
            return inp[inp.length - 1];

        default:
            return val;
    }
}
