import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlist.css';

export class Playlist extends React.Component {

    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e){
      this.props.onNameChange(e.target.value)
    }

    render() {
        return (
            <div className="Playlist">
              <input onChange={this.handleNameChange} placeholder= {'New Playlist'}/>
              <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
              <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
};