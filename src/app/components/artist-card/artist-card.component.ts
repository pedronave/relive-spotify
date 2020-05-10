import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css']
})
export class ArtistCardComponent implements OnInit {
  @Input() artist: SpotifyApi.ArtistObjectFull;
  @Input() place: number;

  constructor() { }

  ngOnInit(): void {
  }

  get artistGenres(): string {
    const slicedGenres = this.artist.genres.slice(0, 3);
    if (slicedGenres.length > 0) {
      return slicedGenres.reduce((acc, val) => acc.concat(`, ${val}`));
    } else {
      return '';
    }
  }
}
