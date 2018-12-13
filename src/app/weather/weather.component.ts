import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  @Input('data') data;
  @Input('lastUpdate') lastUpdate;

  constructor() { }

  ngOnInit() {
    this.lastUpdate = parseInt(this.lastUpdate);
  }


  /**
  * 
  * Retorna o nome da classe p/ definir a temperatura
  * 
  * @example
  * getTempClass()
  * 
  * @returns uma string com a classe 
  * 
  */

  getTempClass(temp: number): string {

    if (temp > 25) {
      return 'hot';
    }

    if (temp < 5) {
      return 'cold';
    }

    return 'normal';

  }

}
