import { Injectable } from '@angular/core';
import { UsuarioLogiadoService } from './usuario-logiado.service';
@Injectable({
  providedIn: 'root'
})
export class InactividadService {

  idleTime = 0;
  idleInterval;

  constructor( public UsuarioLogiadoService:UsuarioLogiadoService) {
    this.idleTime=0;
  }

  init(){
    console.log("inicio monitoreo");
     this.eliminarIntervalo();
     this.idleInterval == setInterval(() => {
      this.timerIncrement();
    }, 60000);
  }

  keypress(e) {
    this.idleTime = 0;
  }

  mousemove(e) {
    this.idleTime = 0;
  }

  capturaEvento(){
    this.idleTime = 0;
  }

  timerIncrement() {
    console.log("minuto inactivo: "+this.idleTime);
    this.idleTime++;
      if (this.idleTime > 24) { // 20 minutes
          console.log("cerro sesion");
          this.eliminarIntervalo();
          this.UsuarioLogiadoService.cerrarSesion();

      }
  }

  eliminarIntervalo(){
    if (this.idleInterval ) {
      clearInterval(this.idleInterval);
    }
  }
/*   ngOnDestroy() {
    this.eliminarIntervalo();
  } */
}
