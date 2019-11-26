
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
      console.log(accesTokenMatch);
      console.log(expiresInMatch);
      
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
  }

}


