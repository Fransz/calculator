"use strict";

/* eslint-disable no-unused-vars */
import { Component } from "react";
import CalcKey from "../CalcKey";
/* eslint-enable no-unused-vars */

import s from "./CalcOperatorboard.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";


class CalcOperatorboard extends Component {
    constructor(props) {
        super(props);

        this.operators = ["=", "+", "-", "*", "/"];
    }

    render() {
        return <div className={`${s.root} row`}>
            {
                this.operators.map((o) => {
                    const reactKey = `react-key-operator-${o}`;
                    return <CalcKey bootstrapCols="col-md-12" onKey={this.props.onOperator} key={reactKey}>{o}</CalcKey>;
                })
            }
        </div>;
    }
}

export default withStyles(s)(CalcOperatorboard);
