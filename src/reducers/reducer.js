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
    /**
     * Helper function for making sure we do not append a '.' if we already have one in our last input.
     *
     * @param cs The input string.
     * @param foundDot Did we find a dot
     * @returns {String} The original string with all but the first '.' removed.
     */
    function oneDot(cs, foundDot=false) {
        if(cs.length === 0) return "";
        const nextChar = (cs[0] === "." && foundDot) ? "" : cs[0];
        return nextChar + oneDot(cs.slice(1), foundDot || cs[0] === ".");
    }

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
                // adjust the last input after an operator or parenthesis.
                inp[inp.length] = (action.key === "." ? "0" : "") + action.key;
            } else if (last === "CALCULATE" || last === "@@redux/INIT") {
                // create a new last input after a calculation or initialisation.
                inp = [ (action.key === "." ? "0" : "") + action.key ];
            }
            else {
                // Otherwise just add the key.
                inp[inp.length - 1] += action.key;
            }

            // strip multiple dots from the last input.
            inp[inp.length - 1] = oneDot(inp[inp.length - 1]);

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
    // Return the last number while all previous elements where also a number from an array, or 0.
    function getWhileNumber(xs, x=0) {
        if(xs.length === 0 || typeof xs[0] !== "number") {
            return x.toString();
        }
        return getWhileNumber(xs.slice(1), xs[0]);
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
