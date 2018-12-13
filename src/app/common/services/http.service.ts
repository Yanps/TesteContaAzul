import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl: string = 'http://api.openweathermap.org/data/2.5';
  private apiKey: string = '38aedc62a56f9af8f35bc4832db0be70';


  constructor() { }


  /**
  * Cria e retorna um observable que realiza um request
  * 
  * @example
  * createHttpObservable(\'users\', \'GET\')
  * 
  * @param {string} resource endpoint do recurso desejado
  * @param {string} method Método http a ser usado
  * @param {string} params Parâmetros query string
  * @param {any} requestBody Body request
  * 
  * @returns Retorna um observable com o request criado
  * 
  */

 createHttpObservable(
  resource: string,
  method  : string, 
  params  : string,
  requestBody?: any): Observable<any> { 
      
  return Observable.create(observer => {
    const url = `${this.apiUrl}${resource}?${params}&units=metric&appid=${this.apiKey}`; 
    const controller = new AbortController();  // cria um AbortController p/ cancelar a requisição
    const signal = controller.signal; // define um sinal p/ o request em andamento
    
    const requestOptions = { // objeto com as opções de request
      method: method,
      signal: signal,
      body: JSON.stringify(requestBody),
    };

    fetch(url, requestOptions) 
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error('Request failed with status code: ' + response.status);
        }
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => observer.error(err))

    return () => controller.abort();

  });
}


}
