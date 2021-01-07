import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  getFiveDays(city) {
    return this.http.get<any[]>(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=28139758e912a760e182b4fbde016a7b`)
  }

  getNow(city) {
    return this.http.get<any[]>(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=28139758e912a760e182b4fbde016a7b`)
  }
}
