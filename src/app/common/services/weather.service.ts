import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private cities: Array<number> = [184745,3421319,3445709];

  constructor(private httpService: HttpService) { }


  /**
  * Cria e retorna um observable que retorna as informações
  * do clime em real time
  * 
  * @example
  * getCurrentWeatherInfo()
  * 
  * @returns Retorna um observable com o request criado
  * 
  */

  getCurrentWeatherInfo(): Observable<any> {
    const citiesString = this.cities.toString();
    return this.httpService.createHttpObservable('/group', 'GET', `id=${citiesString}`);
  }


  /**
  * Cria e retorna um observable que retorna as informações
  * do clima a partir do cache (localStorage)
  * 
  * @example
  * getCurrentWeatherInfoFromCache()
  * 
  * @returns Retorna um observable com o request criado
  * 
  */

  getCurrentWeatherInfoFromCache(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('weatherInfo')));
  }

}
