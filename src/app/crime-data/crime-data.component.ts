import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crime-data',
  templateUrl: './crime-data.component.html',
  styleUrls: ['./crime-data.component.scss']
})
export class CrimeDataComponent implements OnInit {
  crimeData: any;

  weapons: string[] = [];
  weaponCounts: any[] = [];
  dates: string[] = [];
  dateCounts: any[] = [];
  dateSeries: any[] = [{name: 'Crime', series: []}];

  view: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Weapon';
  dateXAxis = 'Date';
  dateYAxis = 'Number of crimes';
  showYAxisLabel = true;
  yAxisLabel = 'Number of times';

  colorScheme = {
    domain: ['#A10A28', '#C7B42C', '#AAAAAA', '#A10A28', '#5AA454']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  

  onSelect(event) {
    console.log(event);
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://data.baltimorecity.gov/resource/59fg-ary5.json').toPromise()
    .then((res:any) => {
      //console.log('res', res);
      this.crimeData = res;
      this.crimeData.forEach(crime => {
        if (crime.weapon === undefined) {
          this.weapons.push(crime.weapon);
          this.weaponCounts.push({ name: 'NA', value: 1});
        }
        if (!this.weapons.includes(crime.weapon)){
          this.weapons.push(crime.weapon);
          this.weaponCounts.push({ name: crime.weapon, value: 1});
        } else {
          const index = this.weapons.indexOf(crime.weapon);
          const weapon = this.weaponCounts[index];
          weapon.value += 1;
        }
        if (!this.dates.includes(crime.crimedate)){
          this.dates.push(crime.crimedate);
          this.dateCounts.push({ name: crime.crimedate, value: 1});
          this.dateSeries[0].series.push({ name: new Date(crime.crimedate), value: 1});
        } else {
          const index = this.dates.indexOf(crime.crimedate);
          const date = this.dateCounts[index];
          date.value += 1;
          const series = this.dateSeries[0].series[index];
          series.value += 1;
        }
      });
      console.log('weapons count', this.dateSeries);
    });
  }

}
