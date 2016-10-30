"use strict";

/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from "react";
import CalcDisplay from "../CalcDisplay";
import CalcKeyboard from "../CalcKeyboard";
import CalcOperatorboard from "../CalcOperatorboard";
/* eslint-enable no-unused-vars */

import s from "./CalcContainer.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import flatten from "lodash.flatten";

class CalcContainer extends Component {
    constructor(props) {
        super(props);

        this.keyboardKeys = [ ["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["0", ".", "ce"] ];
        this.operatorKeys = [ ["=", "+", "-", "*", "/"] ];

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e) {
        if(flatten(this.operatorKeys).includes(e.key)) {
            this.props.onOperator(e.key);
        }
        if(flatten(this.keyboardKeys).includes(e.key)) {
            this.props.onKey(e.key);
        }
    }

    componentDidMount() {
        this.calcContainer.focus();
    }

    render() {
        return <div tabIndex="1" ref={(e) => this.calcContainer = e} onKeyUp={e => this.handleKeyUp(e)} className={s.root}>
            <h1 className="bg-primary">{this.props.title}</h1>
            <div className="row">
                <div className="col-md-offset-4 col-md-3">
                    <CalcDisplay value={this.props.displayValue}/>
                    <CalcKeyboard onKey={this.props.onKey}/>
                </div>
                <div className="col-md-1">
                    <CalcOperatorboard onOperator={this.props.onOperator}/>
                </div>
            </div>
        </div>;
    }
}

CalcContainer.PropTypes = {
    title: PropTypes.string.isRequired,
    displayValue: PropTypes.string,

    onKey: PropTypes.func.isRequired,
    onOperator: PropTypes.func.isRequired,
};


export default withStyles(s)(CalcContainer);
