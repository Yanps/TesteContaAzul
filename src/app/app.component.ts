import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WeatherService } from './common/services/weather.service';
import { Weather } from './common/model/weather';
import { noop } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  weatherData: Weather[];
  lastUpdate : string;
  loading    : boolean = false;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getWeatherData();
  }


  /**
   * 
  * Obtém as informações do clima da API
  * 
  * @example
  * getWeatherData()
  * 
  */

  private getWeatherData(): void {
    const weatherFromCache = localStorage.getItem('weatherInfo');
    const checkLastUpdate = this.checkLastUpdate();

    this.loading = true;

    if (!weatherFromCache || checkLastUpdate > 10) {
      this.weatherService.getCurrentWeatherInfo()
        .subscribe(
          success => {

            const now = new Date().getTime().toString();

            this.weatherData = success.list;
            this.lastUpdate = now;
            
            localStorage.setItem('weatherInfo', JSON.stringify(success.list));
            localStorage.setItem('lastUpdate', now);

          },
          err => console.error('Não foi possível retornar as informações de clima ', err),
          () => this.loading = false
        )
    } else {
      this.weatherService.getCurrentWeatherInfoFromCache()
        .subscribe(
          data => {
            this.weatherData = data
            this.lastUpdate = localStorage.getItem('lastUpdate');
          },
          noop,
          () => this.loading = false
        );
    }
  }


  /**
  * 
  * Verifica a quantos minutos foi a última chamada
  * 
  * @example
  * checkLastUpdate()
  * 
  * @returns Retorna quantos minutos se passaram desde a última chamada
  * 
  */

  private checkLastUpdate(): number {
    const lastUpdate = moment(parseInt(localStorage.getItem('lastUpdate')) || new Date().getTime());
    const now = moment(new Date().getTime());
    const diffMinutes = now.diff(lastUpdate, 'minutes');

    console.log(diffMinutes);

    return diffMinutes;
  }

}
