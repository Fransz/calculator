/* eslint-env node, mocha */
"use strict";

var should = require("should");

var describe = require("mocha").describe;
var it = require("mocha").it;

var rpn = require("../src/shuntingyard/");

describe("tokenize", function() {
    it("should return an array", function() {
        rpn.tokenize("123 + 55").should.be.an.Array();
        rpn.tokenize("123 + 55").should.eql([123, "+", 55]);
    });

    it("should tokenize all operators", function() {
        rpn.tokenize("+ - * / ^ ) (").should.have.length(7);
    });

    it("should not tokenize unknown operators", function() {
        should.throws(() => rpn.tokenize("%"));
    });

    it("should tokenize all digits", function() {
        rpn.tokenize("0123456789").should.eql([123456789]);
    });

    it("should not tokenize unkown digits", function() {
        should.throws(() => rpn.tokenize("0123456789a"));
    });

    it("should use all whitespace as separator", function() {
        rpn.tokenize("0 + 1  -  2   /   3\t*\t4\n(\n5\n\t  )\n\t").should.eql([0, "+", 1, "-", 2, "/", 3, "*", 4, "(", 5, ")"]);
    });

});

describe("shuntingYard", function() {
    it("should return an array", function () {
        rpn.shuntingYard("23 + 5").should.be.an.Array();
    });

    it("should return an empty array given empty input", function () {
        rpn.shuntingYard("").should.be.empty();
    });

    it("should throw an error upon unbalanced parenthesis", function() {
        should.throws(() => rpn.shuntingYard("("));
        should.throws(() => rpn.shuntingYard(")"));
        should.throws(() => rpn.shuntingYard("12 ("));
        should.throws(() => rpn.shuntingYard("12 )"));

        should.throws(() => rpn.shuntingYard("()) 12"));
        should.throws(() => rpn.shuntingYard("(() 12"));

        should.doesNotThrow(() => rpn.shuntingYard("()"));
        should.doesNotThrow(() => rpn.shuntingYard("(())"));
        should.doesNotThrow(() => rpn.shuntingYard("((12))"));
        should.doesNotThrow(() => rpn.shuntingYard("12 ()()"));
    });

    it("should throw an error upon an invalid token", function() {
        should.throws(() => rpn.shuntingYard("a"));
        should.throws(() => rpn.shuntingYard("12 + 23 + a"));
        should.throws(() => rpn.shuntingYard("12 + 23 a"));
    });

    it("should return an array with all numbers and operators, given operators, parenthesis and numbers", function () {
        rpn.shuntingYard("12 + 13 * 15 - (4 / (2 + 6) * 3)").forEach((v) => {
            should(typeof v === "number" || (typeof v === "string" && v !== "(" && v !== ")")).be.true();
        });
    });

    it("should return an array of containing the number when the inputs is only numbers", function () {
        let value = rpn.shuntingYard("12");
        value.length.should.equal(1);
        for (let i = 0; i < value.length; i++) {
            Number(value[i]).should.not.NaN();
        }
    });

    describe("calculations", function () {
        it("should be correct using division", function() {
            rpn.shuntingYard("6 / 2").should.be.eql([3]);
        });

        it("should be correct using multiplication", function() {
            rpn.shuntingYard("3 * 2").should.be.eql([6]);
        });

        it("should be correct using addition", function() {
            rpn.shuntingYard("3 + 2").should.be.eql([5]);
        });

        it("should be correct using subtraction", function() {
            rpn.shuntingYard("3 - 2").should.be.eql([1]);
        });

        it("should be correct on a more complex calculation", function() {
            rpn.shuntingYard("5 + (1 + 2) * 4 - 3").should.be.eql([14]);
            rpn.shuntingYard("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3").should.be.eql([3.0001220703125]);
        });

        it("should be able to become negative", function() {
            rpn.shuntingYard("2 - 3").should.be.eql([-1]);
        });

        it("should be able to handle fractional values", function() {
            rpn.shuntingYard("3 / 2 * 2").should.be.eql([3]);
        });

        it("should be able to become fractional", function() {
            rpn.shuntingYard("2 / 3").should.be.eql([2/3]);
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

    describe("error conditions", function() {
        it("should throw upon not enough values", function () {
            should.throws(() => rpn.rpn([1, "+"]));
            should.throws(() => rpn.rpn([1, "+", 2, 5, "*"]));
        });
    });
});