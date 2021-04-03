import { WeatherService } from './services/weather.service';
import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentDate: Date = new Date();
  isLoading = true;
  city = 'Lviv';
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeatherByCity(this.city).pipe(take(1))
      .subscribe(this.setWeather.bind(this));

    setInterval(() => this.currentDate = new Date(), 1000);
  }

  getWeather(): void {
    this.isLoading = true;
    this.weatherService.getWeatherByCity(this.city).pipe(take(1))
      .subscribe(this.setWeather.bind(this));
  }

  setWeather(weatherData: any): void {
    this.weatherData = weatherData;
    this.isLoading = false;
  }
}
