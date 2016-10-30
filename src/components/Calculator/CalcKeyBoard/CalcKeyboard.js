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
        const keys = [ ["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["0", ".", "ce"] ];

        return keys.map((ks) => {
            const reactKey = `react_key_calc_row_${ks.reduce((acc, k) => acc + k, "")}`;

            return <div key={reactKey} className={`${s.keyrow}`}>
                <div className="row">
                    {
                        ks.map((k) => {
                            const reactKey = `react_key_calc_${k}`;

                            return <CalcKey bootstrapCols="col-md-4" onKey={this.props.onKey} key={reactKey}>{k}</CalcKey>;
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
    onKey: PropTypes.func.isRequired
};

export default withStyles(s)(CalcKeyboard);
