"use strict";

import { shuntingYard, rpn, parse } from "../shuntingyard";

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
    };
}

/**
 * Return the new input state.
 * @param inp               previous state.
 * @param last              previous action.
 * @param action            current action
 * @returns {string[""]}    An array with all inputs as string.
 */
function input(inp = [""], last="", action) {
    switch(action.type) {
        case "ADD_OPERATOR":
        case "ADD_PARENTHESES":
            if(last === "") {
                inp[inp.length - 1] = "0";
            }
            inp[inp.length] = action.operator;
            return inp;

        case "ADD_KEY":
            if(last === "ADD_OPERATOR" || last === "ADD_PARENTHESES") {
                inp[inp.length] = action.key;
            } else if (last === "CALCULATE") {
                inp = [ action.key ];
            }
            else {
                inp[inp.length - 1] += action.key;
            }
            return inp;

        case "CLEAR_KEYS":
            inp[inp.length - 1] = "0";
            return inp;

        case "CLEAR_ALL":
            return [ "0" ];

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
        case "ADD_PARENTHESES":
            return getWhileNumber(shuntingYard(parse(inp)));

        case "CALCULATE":
            return getWhileNumber(rpn(shuntingYard(parse(inp))));

        case "CLEAR_KEYS":
        case "CLEAR_ALL":
        case "ADD_KEY":
            return inp[inp.length - 1];

        default:
            return val;
    }
}
