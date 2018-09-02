import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import Moment from 'react-moment';

import {getTrackLyricsURL, getTracksInfoURL} from '../../util';
import Spinner from '../layout/Spinner';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount() {
    axios
      .get(getTrackLyricsURL(this.props.match.params.id))
      .then(res => this.setState({lyrics: res.data.message.body.lyrics}))
      .then(() => axios.get(getTracksInfoURL(this.props.match.params.id)))
      .then(res => this.setState({track: res.data.message.body.track}))
      .catch(err => console.log(err));
  }

  render() {
    const {track, lyrics} = this.state;
    if (Object.keys(track).length > 0) 
      console.log(track.primary_genres.music_genre_list.length > 0)
    return (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0)
      ? <Spinner/>
      : (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name}
              by {' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>

            <ul className="list-group mt-3">
              <li className="list-group-item">
                <strong>Album ID</strong>: {track.album_id}
              </li>
              {
                (track.primary_genres.music_genre_list.length > 0)
                  ? (
                    <li className="list-group-item">
                      <strong>Song Genre</strong>: {' '}{track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                    </li>
                  )
                  : <div/>
              }
              <li className="list-group-item">
                <strong>Explicit Words</strong>: {track.explicit === 0
                  ? 'No'
                  : 'Yes'}
              </li>
              <li className="list-group-item">
                <strong>Release Date</strong>: {' '}<Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
              </li>
            </ul>
          </div>
        </React.Fragment>
      )
  }
}

export default Lyrics;