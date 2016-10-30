"use strict";

import { Component, PropTypes } from "react";
import s from "./CalcKey.css";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class CalcKey extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(key) {
        this.props.onKey(key);
    }

    render () {
        const key = this.props.children;
        return <div className={`calckeywrapper ${this.props.bootstrapCols}`}>
            <div className={s.calckey} onClick={() => this.onClick(key)}>
                {key}
            </div>
        </div>;
    }
}

CalcKey.propTypes = {
    onKey: PropTypes.func.isRequired
};

export default withStyles(s)(CalcKey);
