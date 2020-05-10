import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ChartModule} from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { TopArtistsComponent } from './pages/top-artists/top-artists.component';
import { TopTracksComponent } from './pages/top-tracks/top-tracks.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { TrackFeaturesTabComponent } from './components/track-features-tab/track-features-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    TopArtistsComponent,
    TopTracksComponent,
    ArtistCardComponent,
    TrackCardComponent,
    ListCardComponent,
    TrackFeaturesTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
