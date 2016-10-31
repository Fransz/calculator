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

    shouldComponentUpdate(nextProps) {
        if(nextProps.highlight != this.props.highlight) {
            return true;
        }
        return false;
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

                            return <CalcKey keyHandler={this.props.keyHandler} key={reactKey}
                                 highlight={this.props.highlight === k} bootstrapCols="col-md-4">{k}
                            </CalcKey>;
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
    keys: PropTypes.array.isRequired,
    highlight: PropTypes.string
};

export default withStyles(s)(CalcKeyboard);
