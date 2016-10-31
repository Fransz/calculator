"use strict";

/* eslint-disable no-unused-vars */
import { Component, PropTypes } from "react";
import CalcKey from "../CalcKey";
/* eslint-enable no-unused-vars */

import s from "./CalcOperatorboard.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";


class CalcOperatorboard extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return false;
    }

    renderOperators() {
        const operators = this.props.keys;

        return operators.map((os) => {
            const reactKey = `react_key_operator_row_${os.reduce((acc, o) => acc + o, "")}`;

            return <div key={reactKey} className={`${s.operatorrow} row`}>
                {
                    os.map((o) => {
                        const reactKey = `react_key_operator_${o}`;

                        return <CalcKey bootstrapCols="col-md-6" opHandler={this.props.opHandler} key={reactKey}>{o}</CalcKey>;
                    })
                }
            </div>;
        });
    }

    render() {
        return <div className={s.root}>
            {this.renderOperators()}
        </div>;
    }
}

CalcOperatorboard.propTypes = {
    opHandler: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired
};

export default withStyles(s)(CalcOperatorboard);
