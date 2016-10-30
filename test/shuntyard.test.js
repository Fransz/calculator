/* eslint-env node, mocha */
"use strict";

var should = require("should");

var describe = require("mocha").describe;
var it = require("mocha").it;

var rpn = require("../src/shuntingyard/");

describe("rpn.parse", function() {
    it("should return a number if the input is a number", function() {
        rpn.parse([0]).should.be.eql([0]);
        rpn.parse([3]).should.be.eql([3]);
        rpn.parse([123]).should.be.eql([123]);
        rpn.parse([Number.MAX_SAFE_INTEGER]).should.be.eql([Number.MAX_SAFE_INTEGER]);

        rpn.parse([0.1]).should.be.eql([0.1]);
        rpn.parse([3.1]).should.be.eql([3.1]);
        rpn.parse([123.1]).should.be.eql([123.1]);
        rpn.parse([Number.MAX_SAFE_INTEGER - 0.1]).should.be.eql([Number.MAX_SAFE_INTEGER - 0.1]);
    });

    it("should return an operator if the input is a known operator", function() {
        rpn.parse(["+"]).should.be.eql(["+"]);
        rpn.parse(["-"]).should.be.eql(["-"]);
        rpn.parse(["*"]).should.be.eql(["*"]);
        rpn.parse(["/"]).should.be.eql(["/"]);
        rpn.parse(["^"]).should.be.eql(["^"]);
    });

    it("should return an integer if the input can be parsed as integer", function() {
        rpn.parse(["0"]).should.be.eql([0]);
        rpn.parse(["3"]).should.be.eql([3]);
        rpn.parse(["123"]).should.be.eql([123]);
        rpn.parse([Number.MAX_SAFE_INTEGER.toString()]).should.be.eql([Number.MAX_SAFE_INTEGER]);
    });

    it("should return float if the input can be parsed as a float", function() {
        rpn.parse(["0.1"]).should.be.eql([0.1]);
        rpn.parse(["3.1"]).should.be.eql([3.1]);
        rpn.parse(["123.1"]).should.be.eql([123.1]);
        rpn.parse([(Number.MAX_SAFE_INTEGER - 0.1).toString()]).should.be.eql([Number.MAX_SAFE_INTEGER - 0.1]);
    });

    it("should parse strings with '(' and ')'", function() {
        rpn.parse(["(0)"]).should.be.eql(["(", 0, ")"]);
        rpn.parse(["(" + Number.MAX_SAFE_INTEGER.toString() + ")"]).should.be.eql(["(", Number.MAX_SAFE_INTEGER, ")"]);

        rpn.parse(["(123.1)"]).should.be.eql(["(", 123.1, ")"]);
        rpn.parse(["(" + (Number.MAX_SAFE_INTEGER - 0.1).toString() +")"]).should.be.eql("(", [Number.MAX_SAFE_INTEGER - 0.1, ")"]);
    });

    it("should throw on other inputs", function() {
        should.throws(() => rpn.parse(["a"]));
        should.throws(() => rpn.parse(["1a"]));
        should.throws(() => rpn.parse(["a1"]));

        should.throws(() => rpn.parse(["1.a"]));
        should.throws(() => rpn.parse(["+a"]));

        should.throws(() => rpn.parse(["1.1.1"]));
        should.throws(() => rpn.parse(["+a"]));
    })
});

describe("shuntingYard", function() {
    it("should return an array", function () {
        rpn.shuntingYard([23, "+", 5]).should.be.an.Array();
    });

    it("should return an empty array given empty input", function () {
        rpn.shuntingYard([]).should.be.empty();
        rpn.shuntingYard().should.be.empty();
    });

    it("should throw an error upon unbalanced parenthesis", function() {
        should.throws(() => rpn.shuntingYard(["("]));
        should.throws(() => rpn.shuntingYard([")"]));
        should.throws(() => rpn.shuntingYard([12, "("]));
        should.throws(() => rpn.shuntingYard([12, ")"]));

        should.throws(() => rpn.shuntingYard(["(", ")", ")", 12]));
        should.throws(() => rpn.shuntingYard(["(", "(", ")", 12]));

        should.doesNotThrow(() => rpn.shuntingYard(["(", ")"]));
        should.doesNotThrow(() => rpn.shuntingYard(["(", "(", ")", ")"]));
        should.doesNotThrow(() => rpn.shuntingYard(["(", "(", 12, ")", ")"]));
        should.doesNotThrow(() => rpn.shuntingYard([12, "(", ")", "(", ")"]));
    });

    it("should return an array of containing the number when the inputs is a single numbers", function () {
        let value = rpn.shuntingYard([12]);
        value.length.should.equal(1);
        for (let i = 0; i < value.length; i++) {
            Number(value[i]).should.not.be.NaN();
        }
    });

    describe("calculations", function () {
        it("should be correct using division", function() {
            rpn.shuntingYard([6, "/", 2]).should.be.eql([6, 2, "/"]);
        });

        it("should be correct using multiplication", function() {
            rpn.shuntingYard([3, "*", 2]).should.be.eql([3, 2, "*"]);
        });

        it("should be correct using addition", function() {
            rpn.shuntingYard([3, "+", 2]).should.be.eql([3, 2, "+"]);
        });

        it("should be correct using subtraction", function() {
            rpn.shuntingYard([3, "-", 2]).should.be.eql([3, 2, "-"]);
        });

        it("should be correct on a more complex calculation", function() {
            rpn.shuntingYard([5, "+", "(", 1, "+", 2, ")", "*", 4, "-", 3]).should.be.eql([17, 3, "-"]);
            rpn.shuntingYard([3, "+", 4, "*", 2, "/", "(", 1, "-", 5, ")", "^", 2, "^", 3]).should.be.eql([3, 8, -4, 2, 3, "^", "^", "/", "+"]);
        });
    });
});

describe("rpn", function() {
    describe("return value", function() {
        it("should be an Array", function() {
            rpn.rpn([1, 2, "+"]).should.be.a.Array();
        });

        it("should return 0 on empty input", function() {
            rpn.rpn([]).should.be.eql([]);
        });

        it("should be correct using division", function() {
            rpn.rpn([6, 2, "/"]).should.be.eql([3]);
        });

        it("should be correct using multiplication", function() {
            rpn.rpn([3, 2, "*"]).should.be.eql([6]);
        });

        it("should be correct using addition", function() {
            rpn.rpn([3, 2, "+"]).should.be.eql([5]);
        });

        it("should be correct using subtraction", function() {
            rpn.rpn([3, 2, "-"]).should.be.eql([1]);
        });

        it("should be correct on a more complex calculation", function() {
            rpn.rpn([5, 1, 2, "+", 4, "*", "+", 3, "-"]).should.be.eql([14]);
            rpn.rpn([3, 4, 2, "*", 1, 5, "-", 2, 3, "^", "^", "/", "+"]).should.be.eql([3.0001220703125]);
        });

        it("should be able to handle negative values", function() {
            rpn.rpn([2, -3, "-"]).should.be.eql([5]);
        });

        it("should be able to become negative", function() {
            rpn.rpn([2, 3, "-"]).should.be.eql([-1]);
        });

        it("should be able to handle fractional values", function() {
            rpn.rpn([3/2, 2, "*"]).should.be.eql([3]);
        });

        it("should be able to become fractional", function() {
            rpn.rpn([2, 3, "/"]).should.be.eql([2/3]);
        });
    });
});