

import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.css']
})
export class TopTracksComponent implements OnInit {
  buttonActiveClasses = 'text-xl border-b-4 border-black';
  buttonInactiveClasses = 'text-xl text-gray-600 hover:text-black';

  // 0 long term, 1 medium term, 2 short term, 3 features 
  activeTab = 0;

  tracksList: Observable<SpotifyApi.TrackObjectFull[]>;

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.activateLongTermTab();
  }

  // Activate the all time tab
  activateLongTermTab() {
    this.tracksList = this.spotify.getLongTermTopTracks();
    this.activeTab = 0;
  }

  // Activate the last 6 months tab
  activateMediumTermTab() {
    this.tracksList = this.spotify.getMediumTermTopTracks();
    this.activeTab = 1;
  }

  // Activate the last month tab
  activateShortTermTab() {
    this.tracksList = this.spotify.getShortTermTopTracks();
    this.activeTab = 2;
  }

  activateFeaturesTab() {
    this.activeTab = 3;
  }
}
