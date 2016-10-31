"use strict";

/* eslint-disable no-unused-vars */
import CalcKey from "../CalcKey";
/* eslint-enable no-unused-vars */

import { Component, PropTypes } from "react";
import s from "./calcKeyboard.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class CalcKeyboard extends Component {
    constructor(props) {
        super(props);
    }

    renderKeys() {
        const keys = this.props.keys;

        return keys.map((ks) => {
            const reactKey = `react_key_calc_row_${ks.reduce((acc, k) => acc + k, "")}`;

            return <div key={reactKey} className={`${s.keyrow}`}>
                <div className="row">
                    {
                        ks.map((k) => {
                            const reactKey = `react_key_calc_${k}`;

                            return <CalcKey bootstrapCols="col-md-4" keyHandler={this.props.keyHandler} key={reactKey}>{k}</CalcKey>;
                        })
                    }
                </div>
            </div>;
        });
    }

    render() {
        return <div className={s.root}>
            {this.renderKeys()}
        </div>;
    }
}

CalcKeyboard.propTypes = {
    keyHandler: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired
};

export default withStyles(s)(CalcKeyboard);
