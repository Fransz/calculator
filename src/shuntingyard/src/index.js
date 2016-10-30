"use strict";

const operators = {
    "^": { associativity: "right", precedence: 4, function: (a, b) => { return Math.pow(a, b); } },
    "*": { associativity: "left", precedence: 3, function: (a, b) => { return a * b; } },
    "/": { associativity: "left", precedence: 3, function: (a, b) => { return a / b; } },
    "+": { associativity: "left", precedence: 2, function: (a, b) => { return a + b; } },
    "-": { associativity: "left", precedence: 2, function: (a, b) => { return a - b; } },
};

function parse(input=[]) {
    const intRe = /^[0-9]+$/;
    const floatRe = /^[0-9]+(\.(?![0-9]*\.))?[0-9]*$/;

    return input.map((i) => {
        if (typeof i === "number") {
            return i;
        }
        if (Object.keys(operators).includes(i) || i === "(" || i === ")") {
            return i;
        }
        if(typeof i === "string" && intRe.test(i)) {
            return Number.parseInt(i);
        }
        if(typeof i === "string" && floatRe.test(i)) {
            return Number.parseFloat(i);
        }
        throw(new Error(`not a valid number ${i}`));
    });
}

/**
 * Rewrites the given expression to reverse polish notation, and calculate the result.
 * The input should be am array of valid tokens.
 * Upon an unbalanced parenthesis an Error is thrown.
 *
 * @see https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 *
 * @param input the given expression as an array of valid tokens.
 * @returns {Array} the rewritten, and calculated expression as an array.
 */
function shuntingYard(input=[]) {
    if(! input) {
        return [];
    }

    let output = [], stack = [];

    const shouldMove = (t, s) => {
        return operators[t].precedence < operators[s].precedence ||
            operators[t].precedence === operators[s].precedence && operators[t].associativity === "left";
    };

    for(let i = 0; i < input.length; i++) {
        let token = input[i];

        if(token === "(") {
            stack.unshift(token);
            continue;
        }

        if(token === ")") {
            while(stack.length && stack[0] !== "(") {
                output.push(stack[0]);
                stack.shift();
            }
            output = rpn(output).reverse();

            if(stack[0] !== "(") {
                throw new Error(`Unbalanced parenthesis in ${input}`);
            }
            stack.shift();
            continue;
        }


        if(token === "=") {
            while(stack.length) {
                output.push(stack[0]);
                stack.shift();
            }
            return rpn(output).reverse();
        }

        // Token is a digit.
        if (typeof operators[token] === "undefined") {
            output.push(token);
            continue;
        }

        // Token is an operator, see if we should move from the stack to the queue.
        while(stack.length && stack[0] !== "(" && shouldMove(token, stack[0])) {
            output.push(stack[0]);
            stack.shift();
            output = rpn(output).reverse();
        }

        stack.unshift(token);
    }

    while(stack.length) {
        if(stack[0] === "(") {
            throw new Error(`Unbalanced parenthesis in ${input}`);
        }
        output.push(stack[0]);
        stack.shift();
    }

    return output;
}

/**
 * Calculate the given expression in reverse polish notation.
 *
 * An Error is thrown if an operator does not have enough operands.
 * If the array has more then one element the expression was partial.
 *
 * @see https://en.wikipedia.org/wiki/Reverse_Polish_notation
 *
 * @param input an array with the tokenized expression in rpn.
 * @returns {Array}
 */
function rpn(input = []) {
    let stack = [];

    while(input.length) {
        let t = input.shift();

        if(Object.keys(operators).includes(t)) {
            // token is an operator.
            const func = operators[t].function;

            // Do we have enough operands.
            if(func.length > stack.length) {
                // stack new Error(`Not enough operands for operator ${t}`);
                stack.unshift(t, ...input);
                break;
            }

            let value = func.apply(null, stack.slice(0, func.length).reverse());
            stack = [ value, ...stack.slice(func.length)];
        } else {
            // token is a number push it onto the stack.
            stack.unshift(t);
        }
    }

    return stack;
}

module.exports = { rpn, shuntingYard, parse };
