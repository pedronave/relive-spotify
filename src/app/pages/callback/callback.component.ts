import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      const authSuccess = this.spotify.processCallback(fragment);

      if (authSuccess) {
        this.router.navigateByUrl('/top-artists');
      }
    });
  }

}
