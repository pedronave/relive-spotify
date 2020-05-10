import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { TopArtistsComponent } from './pages/top-artists/top-artists.component';
import { TopTracksComponent } from './pages/top-tracks/top-tracks.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { TrackFeaturesTabComponent } from './components/track-features-tab/track-features-tab.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    TopArtistsComponent,
    TopTracksComponent,
    ArtistCardComponent,
    TrackCardComponent,
    ListCardComponent,
    TrackFeaturesTabComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
