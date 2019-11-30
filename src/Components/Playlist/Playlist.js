import React from 'react';
import {TrackList} from '../TrackList/TrackList';
import './Playlist.css';
import { thisExpression } from '@babel/types';

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
              <input ref="form" onChange={this.handleNameChange} value={this.props.playlistName} placeholder={'New Playlist'}/>
              <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
              <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>
        );
    }
};