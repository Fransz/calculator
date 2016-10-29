"use strict";

import React, { Component, PropTypes } from 'react'

import CalcDisplay from '../CalcDisplay'
import CalcKeyboard from '../CalcKeyboard'
import CalcOperatorboard from '../CalcOperatorboard'
import s from './CalcContainer.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CalcContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        displayValue: PropTypes.string,

        onKey: PropTypes.func.isRequired,
        onOperator: PropTypes.func.isRequired,
    }

    render() {
        return <div className={s.root}>
            <h1 className="bg-primary">{this.props.title}</h1>
            <div className="row">
                <div className="col-md-offset-5 col-md-3">
                    <CalcDisplay value={this.props.displayValue}/>
                    <CalcKeyboard onKey={this.props.onKey}/>
                </div>
                <div className="col-md-1">
                    <CalcOperatorboard onOperator={this.props.onOperator}/>
                </div>
            </div>
        </div>
    }
}

export default withStyles(s)(CalcContainer);
