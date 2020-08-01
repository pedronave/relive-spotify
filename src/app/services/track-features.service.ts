import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { ReplaySubject, Observable } from 'rxjs';
import { TopTracksService } from './top-tracks.service';

@Injectable({
  providedIn: 'root'
})
export class TrackFeaturesService {

  constructor(private spotifyService: SpotifyService, private tracksService: TopTracksService) { }

  private longTermTrackFeaturesLoaded = false;
  private longTermTrackFeatures: ReplaySubject<SpotifyApi.AudioFeaturesObject[]> = new ReplaySubject(1);

  private mediumTermTrackFeaturesLoaded = false;
  private mediumTermTrackFeatures: ReplaySubject<SpotifyApi.AudioFeaturesObject[]> = new ReplaySubject(1);

  private shortTermTrackFeaturesLoaded = false;
  private shortTermTrackFeatures: ReplaySubject<SpotifyApi.AudioFeaturesObject[]> = new ReplaySubject(1);

  getLongTermTrackFeatures(): Observable<SpotifyApi.AudioFeaturesObject[]> {
    if (!this.longTermTrackFeaturesLoaded){
      this.tracksService.getLongTermTopTracks().subscribe( (tracks) => {
        const trackIds = tracks.map(track => track.id);

        this.spotifyService.getApi().getAudioFeaturesForTracks(trackIds).then(
          (data) => {
            this.longTermTrackFeatures.next(data.audio_features);
            this.longTermTrackFeaturesLoaded = true;
          },
          (err) => this.spotifyService.checkResponseError(err)
        );
      });
    }

    return this.longTermTrackFeatures.asObservable();
  }

  getMediumTermTrackFeatures(): Observable<SpotifyApi.AudioFeaturesObject[]> {
    if (!this.mediumTermTrackFeaturesLoaded){
      this.tracksService.getMediumTermTopTracks().subscribe( (tracks) => {
        const trackIds = tracks.map(track => track.id);

        this.spotifyService.getApi().getAudioFeaturesForTracks(trackIds).then(
          (data) => {
            this.mediumTermTrackFeatures.next(data.audio_features);
            this.mediumTermTrackFeaturesLoaded = true;
          },
          (err) => this.spotifyService.checkResponseError(err)
        );
      });
    }

    return this.mediumTermTrackFeatures.asObservable();
  }

  getShortTermTrackFeatures(): Observable<SpotifyApi.AudioFeaturesObject[]> {
    if (!this.shortTermTrackFeaturesLoaded){
      this.tracksService.getShortTermTopTracks().subscribe( (tracks) => {
        const trackIds = tracks.map(track => track.id);

        this.spotifyService.getApi().getAudioFeaturesForTracks(trackIds).then(
          (data) => {
            this.shortTermTrackFeatures.next(data.audio_features);
            this.shortTermTrackFeaturesLoaded = true;
          },
          (err) => this.spotifyService.checkResponseError(err)
        );
      });
    }

    return this.shortTermTrackFeatures.asObservable();
  }
}
