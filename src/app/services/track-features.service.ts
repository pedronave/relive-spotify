import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackFeaturesService {

  constructor(private spotifyService: SpotifyService) { }

  private longTermTrackFeaturesLoaded = false;
  private longTermTrackFeatures: ReplaySubject<SpotifyApi.AudioFeaturesObject[]> = new ReplaySubject(1);

  private mediumTermTrackFeaturesLoaded = false;
  private mediumTermTrackFeatures: ReplaySubject<SpotifyApi.AudioFeaturesObject[]> = new ReplaySubject(1);

  private shortTermTrackFeaturesLoaded = false;
  private shortTermTrackFeatures: ReplaySubject<SpotifyApi.AudioFeaturesObject[]> = new ReplaySubject(1);

  getLongTermTrackFeatures(): Observable<SpotifyApi.AudioFeaturesObject[]> {
    if (!this.longTermTrackFeaturesLoaded){
      this.spotifyService.getLongTermTopTracks().subscribe( (tracks) => {
        const trackIds = tracks.map(track => track.id);

        this.spotifyService.getApi().getAudioFeaturesForTracks(trackIds).then( (data) => {
          this.longTermTrackFeatures.next(data.audio_features);
          this.longTermTrackFeaturesLoaded = true;
        });
      });
    }

    return this.longTermTrackFeatures.asObservable();
  }

  getMediumTermTrackFeatures(): Observable<SpotifyApi.AudioFeaturesObject[]> {
    if (!this.mediumTermTrackFeaturesLoaded){
      this.spotifyService.getMediumTermTopTracks().subscribe( (tracks) => {
        const trackIds = tracks.map(track => track.id);

        this.spotifyService.getApi().getAudioFeaturesForTracks(trackIds).then( (data) => {
          this.mediumTermTrackFeatures.next(data.audio_features);
          this.mediumTermTrackFeaturesLoaded = true;
        });
      });
    }

    return this.mediumTermTrackFeatures.asObservable();
  }

  getShortTermTrackFeatures(): Observable<SpotifyApi.AudioFeaturesObject[]> {
    if (!this.shortTermTrackFeaturesLoaded){
      this.spotifyService.getShortTermTopTracks().subscribe( (tracks) => {
        const trackIds = tracks.map(track => track.id);

        this.spotifyService.getApi().getAudioFeaturesForTracks(trackIds).then( (data) => {
          this.shortTermTrackFeatures.next(data.audio_features);
          this.shortTermTrackFeaturesLoaded = true;
        });
      });
    }

    return this.shortTermTrackFeatures.asObservable();
  }
}
