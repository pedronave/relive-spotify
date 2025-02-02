import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn;
  constructor(private spotify: SpotifyService) {
  }

  ngOnInit(): void {
    // console.log(this.spotify.authUrl());
    this.isLoggedIn = this.spotify.isLoggedIn;
    // this.spotify.checkLocalAuth();
  }
}
