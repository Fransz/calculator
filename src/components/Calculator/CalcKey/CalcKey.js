"use strict";

import { Component, PropTypes } from "react";
import s from "./CalcKey.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class CalcKey extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const key = this.props.children;
        return <div className={`calckeywrapper ${this.props.bootstrapCols}`}>
            <div className={`${s.calckey} ${this.props.highlight ? s.highlight : ""}`}
                 onClick={() => this.props.opHandler ? this.props.opHandler(key): this.props.keyHandler(key)}>
                {key}
            </div>
        </div>;
    }
}

CalcKey.propTypes = {
    keyHandler: PropTypes.func,
    opHandler: PropTypes.func
};

export default withStyles(s)(CalcKey);
