import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUrl: SafeUrl;

  constructor(private spotify: SpotifyService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loginUrl = this.sanitizer.bypassSecurityTrustUrl(this.spotify.authUrl());
  }

}
