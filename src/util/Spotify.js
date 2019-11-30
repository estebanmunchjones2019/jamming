
const clientId = '23f7ac175b164bb48f58586ca665ed6a';
const redirectURI = 'http://localhost:3000/';
let accessToken;


export const Spotify = {
    getAccessToken(){
        if(accessToken){ 
          return accessToken;
  
        }
        const accesTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if ( accesTokenMatch && expiresInMatch ){
             accessToken = accesTokenMatch[1];
             const expiresIn = expiresInMatch[1];
             window.setTimeout(() => accessToken = '', expiresIn * 1000);
             window.history.pushState('Access Token', null, '/');
             return accessToken;
        } else {
            const accessUrl= `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },
  
    async search(term){
        const accessToken = Spotify.getAccessToken();
        try{
            const searchResponse = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: `Bearer ${accessToken}`}});
            if(searchResponse.ok){
               const jsonSearchResponse = await searchResponse.json();
               if (!jsonSearchResponse.tracks){
                return [];
               }
               console.log(jsonSearchResponse.tracks.items);
               return jsonSearchResponse.tracks.items.map((track)=>{
                    return {
                       id: track.id,
                       name: track.name,
                       artist: track.artists[0].name,
                       album: track.album.name,
                       uri: track.uri
                    } 
               })
            }
        } catch(error){
          console.log(error.message);
        }
    },
  
    async savePlaylist(playlistName, trackURIs){
      if( !playlistName ){
          playlistName = 'New Playlist';
      }
      if(!trackURIs.length){
          return;
      }
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}`}
      let userId;
      let playlistId;
      let snapshotId;

      
      try {
        const userIdResponse = await fetch('https://api.spotify.com/v1/me', {headers: headers})
        if (userIdResponse.ok){
            const jsonUserIdResponse = await userIdResponse.json();
            userId = jsonUserIdResponse.id;
            console.log(`user_id: ${userId}`); // works fine till here

            const createPlaylistResponse = await fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({name: playlistName}),
            method: 'POST'
            });
            
            if(createPlaylistResponse.ok){
               
                const jsonCreatePlaylistResponse = await createPlaylistResponse.json();
                playlistId = jsonCreatePlaylistResponse.id;
                console.log(`playlistId: ${playlistId}`);

                const playlistResponse = await fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({uris: trackURIs}),
                method: 'POST'

                });
                
                if(playlistResponse.ok){
                    const jsonPlaylistResponse = await playlistResponse.json();
                    snapshotId = jsonPlaylistResponse.snapshot_id;
                    console.log(`napshotId: ${snapshotId}`);
                }
            }
        }
    }catch(error){
        console.log(error.message);
    }
  }

}
   
            
         
            
 /*--------------------Spotify module with fetch().then(). It has been refractored above with async await try and catch blocks-------------------------------------
 
 export const Spotify = {
  getAccessToken(){
      if(accessToken){ 
        return accessToken;

      }
      const accesTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      
      if ( accesTokenMatch && expiresInMatch ){
           accessToken = accesTokenMatch[1];
           const expiresIn = expiresInMatch[1];
           window.setTimeout(() => accessToken = '', expiresIn * 1000);
           window.history.pushState('Access Token', null, '/');
           return accessToken;
      } else {
          const accessUrl= `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = accessUrl;
      }
  },

  search(term){
      const accessToken = Spotify.getAccessToken();
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: `Bearer ${accessToken}`}})
        .then((response)=>{
            return response.json();
        })
        .then((jsonResponse)=>{
            if (!jsonResponse.tracks){
                return [];
            }

            return jsonResponse.tracks.items.map((track)=>{
                 return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                 } 
            })
        }) 
  },

  savePlaylist(playlistName, trackURIs){
    if( !playlistName || !trackURIs.length ){
        return;
  }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`}
    let userId;
    
    return fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then((userProfile)=>{ 
          return userProfile.json()})
      .then((jsonUserProfile)=>{
          const userId = jsonUserProfile.id;
          console.log(`user_id: ${userId}`);
          return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({name: playlistName}),
            method: 'POST'
            })
            .then((playlist)=>{
                return playlist.json();
            })
            .then((jsonPlaylist)=>{
                const playlistId = jsonPlaylist.id;
                console.log(`playlistId: ${playlistId}`);
                return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({uris: trackURIs}),
                method: 'POST'

                  })
                  .then((playlist)=>{
                      return playlist.json();
                  })
                  .then((jsonPlaylist)=>{
                      console.log(`snaphot_id: ${jsonPlaylist.snapshot_id}`);
                      return jsonPlaylist.snapshot_id;
                  })
            }) 
    })  
  }

}
*/              
        
  


