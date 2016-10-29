"use strict";

const operators = {
    "^": { associativity: "right", precedence: 4, function: (a, b) => { return Math.pow(a, b) } },
    "*": { associativity: "left", precedence: 3, function: (a, b) => { return a * b } },
    "/": { associativity: "left", precedence: 3, function: (a, b) => { return a / b } },
    "+": { associativity: "left", precedence: 2, function: (a, b) => { return a + b } },
    "-": { associativity: "left", precedence: 2, function: (a, b) => { return a - b } },
};

function tokenize(input) {
    console.log('tokenizer input: ' + input);

    let tokens = [], ops = ['^', '*', '/', '+', '-', '(', ')', '='];
    const inp = input.trim().split(/\s+/g);

    console.log('tokenizer inp: ' + inp);

    for (let i = 0; i < inp.length; i++) {
        if(ops.includes(inp[i])) {
            tokens.push(inp[i]);
        } else if(inp[i].match(/\d+/)) {
            tokens.push(Number(inp[i]));
        } else {
            throw new Error(`Found invalid token ${token} in ${input}`);
        }
    }
    console.log('tokenizer result: ' + tokens);
    return tokens;
}

/**
 * Rewrites the given expression to reverse polish notation, and calculate the result.
 * Upon an unbalanced parenthesis an Error is thrown.
 *
 * @see https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 *
 * @param input the given expression.
 * @returns {Array} the rewritten, and calculated expression as an array.
 */
function shuntingYard(input = "") {
    console.log('shuntingyard input: ' + input);
    if(! input) {
        return [];
    }

    let output = [], stack = [];
    let tokens = tokenize(input);


    const shouldMove = (t, s) => {
        return operators[t].precedence < operators[s].precedence ||
            operators[t].precedence === operators[s].precedence && operators[t].associativity === "left";
    };

    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        console.log("shunting yard: " + token);

        if(token === '(') {
            stack.unshift(token);
            continue;
        }

        if(token === ')') {
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


        if(token === '=') {
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
            stack.shift()
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

    console.log('shuntingyard output: ' + output);
    return output;
}

/**
 * Calculate the given exoression in reverse polish notation.
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
    console.log('rpn input: ' + input);
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

    console.log('rpn output: ' + stack);
    return stack;
}


function examples () {
    console.log(shuntingYard("23 + 12 + 5"));
    console.log(shuntingYard("23 + 12 * 5"));
    console.log(shuntingYard("23 * 12 + 5"));
    console.log(shuntingYard("23 + 12 + 5"));
    console.log(shuntingYard("23 * 12 * 5"));
    console.log(shuntingYard("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3"));
}

module.exports = { rpn, shuntingYard, tokenize };
