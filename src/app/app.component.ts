import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weathers = []
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  now = {day: '', condition: '', temp: 0, date: '', location: ''}
  city = "Casablanca"

  constructor(private weatherService:WeatherService) {}

  ngOnInit() {
    this.getFiveDays()
    this.getNow()
  }

  getFiveDays() {
    this.weatherService.getFiveDays(this.city).subscribe(
      data => {
        this.weathers = []
        for (let day of data["list"]) {
          let [dayName, time] = day["dt_txt"].split(" ")
          if (time == "12:00:00")
            this.weathers.push({temp: Math.round(day["main"]["temp"]), day: this.days[new Date(dayName).getDay()], condition: day["weather"][0]["icon"]})
        }

        console.log(this.weathers)
      },
      erros => console.log(erros),
      () => console.log('weather retrieved')
    )
  }

  getNow() {
    this.weatherService.getNow(this.city).subscribe(
      data => this.now = {temp: Math.round(data["main"]["temp"]), day: this.days[new Date().getDay()], condition: data["weather"]["main"], date: new Date().toDateString(), location: data["name"] + ", " + data["sys"]["country"]},
      erros => console.log(erros),
      () => console.log('weather retrieved')
    )
  }

  update() {
    this.getNow()
    this.getFiveDays()
  }
}
