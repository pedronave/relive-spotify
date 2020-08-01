import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopTracksService {
  private longTermTopTracksLoaded = false;
  private longTermTopTracks: ReplaySubject<SpotifyApi.TrackObjectFull[]> = new ReplaySubject(1);
  private mediumTermTopTracksLoaded = false;
  private mediumTermTopTracks: ReplaySubject<SpotifyApi.TrackObjectFull[]> = new ReplaySubject(1);
  private shortTermTopTracksLoaded = false;
  private shortTermTopTracks: ReplaySubject<SpotifyApi.TrackObjectFull[]> = new ReplaySubject(1);


  constructor(private spotifyService: SpotifyService) { }

  getLongTermTopTracks(): Observable<SpotifyApi.TrackObjectFull[]> {
    if (!this.longTermTopTracksLoaded) {
      this.spotifyService.getApi().getMyTopTracks({time_range: 'long_term', limit: 50}).then(
        (data) => {
          this.longTermTopTracks.next(data.items);
          this.longTermTopTracksLoaded = true;
        },
        (err) => this.spotifyService.checkResponseError(err)
      );
    }

    return this.longTermTopTracks.asObservable();
  }

  getMediumTermTopTracks(): Observable<SpotifyApi.TrackObjectFull[]> {
    if (!this.mediumTermTopTracksLoaded) {
      this.spotifyService.getApi().getMyTopTracks({time_range: 'medium_term', limit: 50}).then(
        (data) => {
          this.mediumTermTopTracks.next(data.items);
          this.mediumTermTopTracksLoaded = true;
        },
        (err) => this.spotifyService.checkResponseError(err)
      );
    }

    return this.mediumTermTopTracks.asObservable();
  }

  getShortTermTopTracks(): Observable<SpotifyApi.TrackObjectFull[]> {
    if (!this.shortTermTopTracksLoaded) {
      this.spotifyService.getApi().getMyTopTracks({time_range: 'short_term', limit: 50}).then(
        (data) => {
          this.shortTermTopTracks.next(data.items);
          this.shortTermTopTracksLoaded = true;
        },
        (err) => this.spotifyService.checkResponseError(err)
      );
    }

    return this.shortTermTopTracks.asObservable();
  }
}
