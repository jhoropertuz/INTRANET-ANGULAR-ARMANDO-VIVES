import { Component, OnInit } from '@angular/core';
import { InactividadService } from 'app/servicios/inactividad.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {


  constructor(private InactividadService:InactividadService){
    this.InactividadService.init();
  }

  ngOnInit() {

  }

  onKeypress(e){
    console.log("keypress");
    this.InactividadService.capturaEvento();
  }
  onMousemove(e){
    console.log("mousemove");
    this.InactividadService.capturaEvento();
  }
}
