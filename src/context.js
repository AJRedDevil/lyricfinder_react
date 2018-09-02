import React, {Component} from 'react'
import axios from 'axios';

import { getChartTracksURL } from './util';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        trackList: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
}

export class Provider extends Component {
  state = {
    trackList: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(state => reducer(state, action))
  }

  componentDidMount() {
    axios
      .get(getChartTracksURL())
      .then(res => this.setState({trackList: res.data.message.body.track_list}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;