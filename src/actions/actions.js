"use strict"

export const addKey = (key) => {
    return {
        type: 'ADD_KEY',
        key
    }
};

export const clearKeys = () => {
    return {
        type: 'CLEAR_KEYS'
    }
};

export const addOperator = (operator) => {
    return {
        type: 'ADD_OPERATOR',
        operator
    }
};

export const calculate = () => {
    return {
        type: 'CALCULATE'
    }
};