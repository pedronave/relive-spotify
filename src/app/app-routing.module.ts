import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './pages/callback/callback.component';
import { TopArtistsComponent } from './pages/top-artists/top-artists.component';
import { TopTracksComponent } from './pages/top-tracks/top-tracks.component';
import { LoginComponent } from './pages/login/login.component';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'top-artists', component: TopArtistsComponent, canActivate: [SpotifyAuthGuard] },
  { path: 'top-tracks', component: TopTracksComponent, canActivate: [SpotifyAuthGuard] },
  { path: '**', redirectTo: 'top-tracks'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
