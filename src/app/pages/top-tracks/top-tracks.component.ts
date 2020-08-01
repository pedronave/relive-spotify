import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TopTracksService } from 'src/app/services/top-tracks.service';

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

  constructor(private spotify: TopTracksService) { }

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

  get currentTabName(): string {
    switch (this.activeTab) {
      case 0:
        return 'Top tracks of all time';
      case 1:
        return 'Top tracks of last 6 Months';
      case 2:
        return 'Top tracks of last Month';
      case 3:
        return 'Track features';
    }
  }
}
