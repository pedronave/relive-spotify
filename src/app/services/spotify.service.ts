import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { AuthCallback, AuthState } from '../models/auth-callback.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotify = new SpotifyWebApi();

  authState: AuthState;

  private longTermTopArtistsLoaded = false;
  private longTermTopArtists: ReplaySubject<SpotifyApi.ArtistObjectFull[]> = new ReplaySubject(1);
  private mediumTermTopArtistsLoaded = false;
  private mediumTermTopArtists: ReplaySubject<SpotifyApi.ArtistObjectFull[]> = new ReplaySubject(1);
  private shortTermTopArtistsLoaded = false;
  private shortTermTopArtists: ReplaySubject<SpotifyApi.ArtistObjectFull[]> = new ReplaySubject(1);

  private longTermTopTracksLoaded = false;
  private longTermTopTracks: ReplaySubject<SpotifyApi.TrackObjectFull[]> = new ReplaySubject(1);
  private mediumTermTopTracksLoaded = false;
  private mediumTermTopTracks: ReplaySubject<SpotifyApi.TrackObjectFull[]> = new ReplaySubject(1);
  private shortTermTopTracksLoaded = false;
  private shortTermTopTracks: ReplaySubject<SpotifyApi.TrackObjectFull[]> = new ReplaySubject(1);

  constructor() {}

  authUrl() {
    const scopes = ['user-top-read', 'user-read-recently-played'];
    const clientIdParam = `client_id=${environment.clientId}`;
    const redirectUriParam = `redirect_uri=${environment.redirectUri}`;
    const responseTypeParam = `response_type=token`;

    const scopesParamValues = scopes.reduce((acc, cur) => `${acc}%20${cur}`);
    const scopesParam = `scope=${scopesParamValues}`;

    const authUrl = `https://accounts.spotify.com/authorize?${clientIdParam}&${redirectUriParam}&${responseTypeParam}&${scopesParam}`;
    return authUrl;
  }

  processCallback(hashFragment: string): boolean {
    const jsonFragment = '{"' + decodeURI(hashFragment).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}';
    const callbackValues: AuthCallback = JSON.parse(jsonFragment);

    // If the hash fragment doesn't have an error key then auth was successful
    if (callbackValues.error !== undefined) {
      console.log('permission denied');
      return false;
    } else {
      callbackValues.expires_in = +callbackValues.expires_in;

      this.authState = AuthState.fromAuthCallback(callbackValues);
      this.spotify.setAccessToken(this.authState.accessToken);
      localStorage.setItem('spotify_auth', JSON.stringify(this.authState));

      return true;
    }

  }

  getApi(): SpotifyWebApi.SpotifyWebApiJs {
    return this.spotify;
  }

  checkLocalAuth() {
    const localstorageToken = localStorage.getItem('spotify_auth');
    if (localstorageToken !== undefined && localstorageToken !== null) {
      const savedAuth: AuthState = new AuthState(JSON.parse(localstorageToken));
      if (savedAuth.expirationDate.getTime() > Date.now()) {
        this.authState = savedAuth;
        this.spotify.setAccessToken(this.authState.accessToken);
        console.log('Saved auth');
      }else {
        console.log('Token expired');
      }
    }else {
      console.log('Token not saved');
    }
  }

  // ARTISTS
  getLongTermTopArtists(): Observable<SpotifyApi.ArtistObjectFull[]> {
    if (!this.longTermTopArtistsLoaded) {
      this.spotify.getMyTopArtists({time_range: 'long_term', limit: 50}).then(
        (data) => {
          this.longTermTopArtists.next(data.items);
          this.longTermTopArtistsLoaded = true;
        }
      );
    }

    return this.longTermTopArtists.asObservable();
  }

  getMediumTermTopArtists(): Observable<SpotifyApi.ArtistObjectFull[]> {
    if (!this.mediumTermTopArtistsLoaded) {
      this.spotify.getMyTopArtists({time_range: 'medium_term', limit: 50}).then(
        (data) => {
          this.mediumTermTopArtists.next(data.items);
          this.mediumTermTopArtistsLoaded = true;
        }
      );
    }

    return this.mediumTermTopArtists.asObservable();
  }

  getShortTermTopArtists(): Observable<SpotifyApi.ArtistObjectFull[]> {
    if (!this.shortTermTopArtistsLoaded) {
      this.spotify.getMyTopArtists({time_range: 'short_term', limit: 50}).then(
        (data) => {
          this.shortTermTopArtists.next(data.items);
          this.shortTermTopArtistsLoaded = true;
        }
      );
    }

    return this.shortTermTopArtists.asObservable();
  }


  // TRACKS
  getLongTermTopTracks(): Observable<SpotifyApi.TrackObjectFull[]> {
    if (!this.longTermTopTracksLoaded) {
      this.spotify.getMyTopTracks({time_range: 'long_term', limit: 50}).then(
        (data) => {
          this.longTermTopTracks.next(data.items);
          this.longTermTopTracksLoaded = true;
        }
      );
    }

    return this.longTermTopTracks.asObservable();
  }

  getMediumTermTopTracks(): Observable<SpotifyApi.TrackObjectFull[]> {
    if (!this.mediumTermTopTracksLoaded) {
      this.spotify.getMyTopTracks({time_range: 'medium_term', limit: 50}).then(
        (data) => {
          this.mediumTermTopTracks.next(data.items);
          this.mediumTermTopTracksLoaded = true;
        }
      );
    }

    return this.mediumTermTopTracks.asObservable();
  }

  getShortTermTopTracks(): Observable<SpotifyApi.TrackObjectFull[]> {
    if (!this.shortTermTopTracksLoaded) {
      this.spotify.getMyTopTracks({time_range: 'short_term', limit: 50}).then(
        (data) => {
          this.shortTermTopTracks.next(data.items);
          this.shortTermTopTracksLoaded = true;
        }
      );
    }

    return this.shortTermTopTracks.asObservable();
  }

 
}
