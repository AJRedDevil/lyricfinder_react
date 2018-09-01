import React, { Component } from 'react'

import {Consumer} from '../../context';
import Spinner from '../layout/Spinner';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          console.log(value);
          const { trackList } = value;
          return (trackList === undefined || trackList.length === 0)
            ? <Spinner />
            : <h1>Tracks Loaded</h1>
        }}
      </Consumer>
    )
  }
}

export default Tracks;