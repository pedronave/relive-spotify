import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  @Input() title: string;
  @Input() imgSrc: string;
  @Input() subtitle: string;
  @Input() place: number;
  @Input() uri: string;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  get sanitizedURI(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.uri);
  }

}
