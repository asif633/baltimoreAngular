# Angular Ngx Charts Example Using Baltimore Data https://data.baltimorecity.gov/

### Data sctructure https://data.baltimorecity.gov/resource/59fg-ary5.json

### Grouping of data for chart display

####Actual Data in Array form shown here single.
```
{
  "weapon" : "KNIFE",
  "location_1" : {
    "latitude" : "39.30217",
    "needs_recoding" : false,
    "longitude" : "-76.66538"
  },
  "post" : "814",
  "crimecode" : "4B",
  "district" : "SOUTHWESTERN",
  "crimedate" : "2014-12-31T00:00:00",
  "description" : "AGG. ASSAULT",
  "location" : "1300 POPLAR GROVE ST",
  "neighborhood" : "Winchester",
  "crimetime" : "22:22:00"
}
```
####Data manipulation for charts

```
// Replacing missing data
        if (crime.weapon === undefined) {
          this.weapons.push(crime.weapon);
          this.weaponCounts.push({ name: 'NA', value: 1});
        }
        // Adding counts of weapons
        if (!this.weapons.includes(crime.weapon)){
          this.weapons.push(crime.weapon);
          this.weaponCounts.push({ name: crime.weapon, value: 1});
        } else {
          const index = this.weapons.indexOf(crime.weapon);
          const weapon = this.weaponCounts[index];
          weapon.value += 1;
        }
        // For time series data, crime with date
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
```

![alt text](https://github.com/asif633/baltimoreAngular/blob/master/src/assets/screen1.png "Screen3")

![alt text](https://github.com/asif633/baltimoreAngular/blob/master/src/assets/screen2.png "Screen2")

![alt text](https://github.com/asif633/baltimoreAngular/blob/master/src/assets/screen3.png "Screen1")