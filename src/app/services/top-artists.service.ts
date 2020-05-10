import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopArtistsService {

  private longTermTopArtistsLoaded = false;
  private longTermTopArtists: ReplaySubject<SpotifyApi.ArtistObjectFull[]> = new ReplaySubject(1);
  private mediumTermTopArtistsLoaded = false;
  private mediumTermTopArtists: ReplaySubject<SpotifyApi.ArtistObjectFull[]> = new ReplaySubject(1);
  private shortTermTopArtistsLoaded = false;
  private shortTermTopArtists: ReplaySubject<SpotifyApi.ArtistObjectFull[]> = new ReplaySubject(1);

  constructor(private spotifyService: SpotifyService) { }

  getLongTermTopArtists(): Observable<SpotifyApi.ArtistObjectFull[]> {
    if (!this.longTermTopArtistsLoaded) {
      this.spotifyService.getApi().getMyTopArtists({time_range: 'long_term', limit: 50}).then(
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
      this.spotifyService.getApi().getMyTopArtists({time_range: 'medium_term', limit: 50}).then(
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
      this.spotifyService.getApi().getMyTopArtists({time_range: 'short_term', limit: 50}).then(
        (data) => {
          this.shortTermTopArtists.next(data.items);
          this.shortTermTopArtistsLoaded = true;
        }
      );
    }

    return this.shortTermTopArtists.asObservable();
  }
}
