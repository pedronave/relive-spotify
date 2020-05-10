import { Component, OnInit } from '@angular/core';
import { TrackFeaturesService } from 'src/app/services/track-features.service';

@Component({
  selector: 'app-track-features-tab',
  templateUrl: './track-features-tab.component.html',
  styleUrls: ['./track-features-tab.component.css']
})
export class TrackFeaturesTabComponent implements OnInit {
  longTermData = [0, 0, 0, 0, 0, 0, 0];
  mediumTermData = [0, 0, 0, 0, 0, 0, 0];
  shortTermData = [0, 0, 0, 0, 0, 0, 0];
  data: any;

  constructor(private features: TrackFeaturesService) {
    this.data = {
      labels: ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'],
      datasets: [
          {
              label: 'All time',
              backgroundColor: 'rgba(34,204,0,0.2)',
              borderColor: 'rgba(34,204,0,1)',
              pointBackgroundColor: 'rgba(34,204,0,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(34,204,0,1)',
              data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
              label: 'Last six months',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            label: 'Last month',
            backgroundColor: 'rgba(77,166,255,0.2)',
            borderColor: 'rgba(77,166,255,1)',
            pointBackgroundColor: 'rgba(77,166,255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,166,255,1)',
            data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
   }

  ngOnInit(): void {
    this.features.getLongTermTrackFeatures().subscribe(data => {
      const longTerm = [0, 0, 0, 0, 0, 0, 0];
      longTerm[0] = data.map(f => f.acousticness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      longTerm[1] = data.map(f => f.danceability).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      longTerm[2] = data.map(f => f.energy).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      longTerm[3] = data.map(f => f.instrumentalness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      longTerm[4] = data.map(f => f.liveness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      longTerm[5] = data.map(f => f.speechiness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      longTerm[6] = data.map(f => f.valence).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      this.data.datasets[0].data = longTerm;
      this.data = {...this.data};
    });
    this.features.getMediumTermTrackFeatures().subscribe(data => {
      const mediumTerm = [0, 0, 0, 0, 0, 0, 0];
      mediumTerm[0] = data.map(f => f.acousticness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      mediumTerm[1] = data.map(f => f.danceability).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      mediumTerm[2] = data.map(f => f.energy).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      mediumTerm[3] = data.map(f => f.instrumentalness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      mediumTerm[4] = data.map(f => f.liveness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      mediumTerm[5] = data.map(f => f.speechiness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      mediumTerm[6] = data.map(f => f.valence).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      this.data.datasets[1].data = mediumTerm;
      this.data = {...this.data};
    });
    this.features.getShortTermTrackFeatures().subscribe(data => {
      const shortTerm = [0, 0, 0, 0, 0, 0, 0];
      shortTerm[0] = data.map(f => f.acousticness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      shortTerm[1] = data.map(f => f.danceability).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      shortTerm[2] = data.map(f => f.energy).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      shortTerm[3] = data.map(f => f.instrumentalness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      shortTerm[4] = data.map(f => f.liveness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      shortTerm[5] = data.map(f => f.speechiness).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      shortTerm[6] = data.map(f => f.valence).reduce((acc, val, i) => acc + (val - acc) / ( i + 1), 0);
      this.data.datasets[2].data = shortTerm;
      this.data = {...this.data};
    });
  }

}
