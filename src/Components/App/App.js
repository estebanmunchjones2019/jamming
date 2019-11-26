import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';




export class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      
      searchResults: [
        {name: 'name1',
         artist: 'artist1',
         album: 'album1',
         id: 1},
         {name: 'name2',
         artist: 'artist2',
         album: 'album2',
         id: 2},
         {name: 'name3',
         artist: 'artist3',
         album: 'album3',
         id: 3}
        ],
        
        playlistName: 'new Playlist',

        playlistTracks: [
          {name: 'name1',
         artist: 'artist1',
         album: 'album1',
         id: 1},
         {name: 'name2',
         artist: 'artist2',
         album: 'album2',
         id: 2}
        ]
      };
      
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id )){
      return;
    }
    tracks.push(track);
      this.setState({playlistTracks: tracks});
    }

    removeTrack(track){
      let tracks = this.state.playlistTracks;
      let trackIndex= '';
      tracks.forEach((savedTrack, index)=>{
        if (savedTrack.id === track.id){
          trackIndex= index;
        }
      });
      tracks.splice(trackIndex,1);
      this.setState({playlistTracks: tracks});
    }

    updatePlaylistName(name){
      this.setState({ playlistName: name })
    }

    savePlaylist(){
      alert('savePlaylist correctly linked');
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
    }

    search(term){
      console.log(term);
      const accessToken = Spotify.getAccessToken();
      console.log(accessToken);

    }
    
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}
  
  

