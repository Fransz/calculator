"use strict";

/* global setTimeout, clearTimeout */
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

        this.state = { highlight: "" };

        this.timeoutId = 0;
        this.keyboardKeys = [ ["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["0", ".", "ce"] ];
        this.operatorKeys = [ ["c", "="], ["/", "("], ["*", ")"], ["+", "±"], ["-", "%"] ];

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e) {
        if(flatten(this.operatorKeys).includes(e.key)) {
            this.props.opHandler(e.key);
        }
        if(flatten(this.keyboardKeys).includes(e.key)) {
            this.props.keyHandler(e.key);

            this.setState({highlight: e.key});
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => { this.setState({highlight: ""}); }, 300);
        }
    }

    componentDidMount() {
        this.calcContainer.focus();
    }

    render() {
        return <div tabIndex="1" ref={(e) => this.calcContainer = e} onKeyUp={e => this.handleKeyUp(e)}>
            <div className="row">
                <div className={`col-md-offset-3 col-md-5 ${s.root}`}>
                    <div className="row">
                        <div className="col-md-7">
                            <CalcDisplay value={this.props.displayValue}/>
                            <CalcKeyboard keys={this.keyboardKeys} keyHandler={this.props.keyHandler} highlight={this.state.highlight} />
                        </div>
                        <div className="col-md-5">
                            <CalcOperatorboard keys={this.operatorKeys} opHandler={this.props.opHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

CalcContainer.PropTypes = {
    displayValue: PropTypes.string,

    keyHandler: PropTypes.func.isRequired,
    opHandler: PropTypes.func.isRequired,
};


export default withStyles(s)(CalcContainer);
