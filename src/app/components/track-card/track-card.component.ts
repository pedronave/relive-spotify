import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css']
})
export class TrackCardComponent implements OnInit {
  @Input() track: SpotifyApi.TrackObjectFull;
  @Input() place: number;

  constructor() { }

  ngOnInit(): void {
  }

}
