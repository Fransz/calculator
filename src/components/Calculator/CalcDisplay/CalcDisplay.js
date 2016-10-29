"use strict"

import React, { Component, PropTypes } from 'react';
import s from './CalcDisplay.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class CalcDisplay  extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render() {
    return <div className={s.root}>
            {this.props.value}
      </div>
  }
}
export default withStyles(s)(CalcDisplay);
