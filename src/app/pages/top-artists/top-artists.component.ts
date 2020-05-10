import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.css']
})
export class TopArtistsComponent implements OnInit {
  buttonActiveClasses = 'text-xl border-b-4 border-black';
  buttonInactiveClasses = 'text-xl text-gray-600 hover:text-black';

  // 0 long term, 1 medium term, 2 short term
  activeTab = 0;

  artistList: Observable<SpotifyApi.ArtistObjectFull[]>;

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.activateLongTermTab();
  }

  // Activate the all time tab
  activateLongTermTab() {
    this.artistList = this.spotify.getLongTermTopArtists();
    this.activeTab = 0;
  }

  // Activate the last 6 months tab
  activateMediumTermTab() {
    this.artistList = this.spotify.getMediumTermTopArtists();
    this.activeTab = 1;
  }

  // Activate the last month tab
  activateShortTermTab() {
    this.artistList = this.spotify.getShortTermTopArtists();
    this.activeTab = 2;
  }
}
