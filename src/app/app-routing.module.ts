import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './pages/callback/callback.component';
import { TopArtistsComponent } from './pages/top-artists/top-artists.component';
import { TopTracksComponent } from './pages/top-tracks/top-tracks.component';


const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'top-artists', component: TopArtistsComponent },
  { path: 'top-tracks', component: TopTracksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
