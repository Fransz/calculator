"use strict";

import { Component, PropTypes } from "react";
import s from "./CalcDisplay.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class CalcDisplay  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={s.root}>
                {this.props.value}
          </div>;
    }
}

CalcDisplay.propTypes = {
    value: PropTypes.string.isRequired
};

export default withStyles(s)(CalcDisplay);
