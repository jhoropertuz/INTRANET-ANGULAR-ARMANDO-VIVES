import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  Actual(formato){
    return moment().format(formato);
  }

  formatiar(fecha,formato){
    return moment(fecha).format(formato);
  }
}
