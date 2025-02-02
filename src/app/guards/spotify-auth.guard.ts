import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthGuard implements CanActivate {

  constructor(private spotify: SpotifyService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Checks if the token saved in local storage has expired or not. If it has, user is redirected to the login page.
      // If the local storage expiration value has been modified, user is redirected to login page if a 401 request is received by the spotify client.
      const tokenState = this.spotify.checkLocalAuth();
      if (tokenState) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
      }
  }
}
