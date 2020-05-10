import { Component, OnInit } from '@angular/core';
import { TrackFeaturesService } from 'src/app/services/track-features.service';
import { ChartType, ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-track-features-tab',
  templateUrl: './track-features-tab.component.html',
  styleUrls: ['./track-features-tab.component.css']
})
export class TrackFeaturesTabComponent implements OnInit {

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'All time' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Last six months' },
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Last month' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(private features: TrackFeaturesService) {
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
      this.radarChartData[0].data = longTerm;
      this.radarChartData = [...this.radarChartData];
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
      this.radarChartData[1].data = mediumTerm;
      this.radarChartData = [...this.radarChartData];
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
      this.radarChartData[2].data = shortTerm;
      this.radarChartData = [...this.radarChartData];
    });
  }

}
