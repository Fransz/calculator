"use strict"

import React, { Component, PropTypes } from 'react';
import s from './CalcKey.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CalcKey extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        onKey: PropTypes.func.isRequired
    }

    onClick(key) {
        this.props.onKey(key);
    }

    render () {
        const calcKey = this.props.children;
        return <div className={`calckeywrapper ${this.props.bootstrapCols}`}>
            <div className={s.calckey} onClick={(e) => this.onClick(calcKey)}>
                {calcKey}
            </div>
        </div>
    }
}

export default withStyles(s)(CalcKey);
