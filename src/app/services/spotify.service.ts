import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import SpotifyWebApi from 'spotify-web-api-js';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';


import { environment } from './../../environments/environment';
import { AuthCallback, AuthState } from '../models/auth-callback.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  spotify = new SpotifyWebApi();

  authState: AuthState;

  private isLoggedInSubject: ReplaySubject<boolean> = new ReplaySubject(1);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

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
      this.isLoggedInSubject.next(false);
      return false;
    } else {
      callbackValues.expires_in = +callbackValues.expires_in;

      this.authState = AuthState.fromAuthCallback(callbackValues);
      this.spotify.setAccessToken(this.authState.accessToken);
      localStorage.setItem('spotify_auth', JSON.stringify(this.authState));
      this.isLoggedInSubject.next(true);
      return true;
    }

  }

  getApi(): SpotifyWebApi.SpotifyWebApiJs {
    return this.spotify;
  }

  checkLocalAuth(): boolean {
    const localstorageToken = localStorage.getItem('spotify_auth');
    if (localstorageToken !== undefined && localstorageToken !== null) {
      const savedAuth: AuthState = new AuthState(JSON.parse(localstorageToken));
      if (savedAuth.expirationDate.getTime() > Date.now()) {
        this.authState = savedAuth;
        this.spotify.setAccessToken(this.authState.accessToken);
        this.isLoggedInSubject.next(true);
        return true;
      }else {
        this.isLoggedInSubject.next(false);
        return false;
      }
    }else {
      this.isLoggedInSubject.next(false);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('spotify_auth');
    this.router.navigateByUrl('/login');
  }

  checkResponseError(err) {
    // If a 401 is returned the token may have expired. Clear the token and send user back to login page;
    if (err.status === 401) {
        this.logout();
    }
  }
}
