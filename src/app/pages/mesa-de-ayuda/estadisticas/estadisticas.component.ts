import { Component, OnInit } from '@angular/core';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { Endpoind } from '../../../endpoind';
import Chart from 'chart.js';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  constructor(private BaseService:BaseService, public SweetalertService:SweetalertService) { }
  datos;
  cargando=false;
  ngAfterViewInit() {
    var speedCanvas2 = document.getElementById("speedChart2");

    const COLORS = [
      '#4dc9f6',
      '#f67019',
      '#f53794',
      '#537bc4',
      '#acc236',
      '#166a8f',
      '#00a950',
      '#58595b',
      '#8549ba'
    ];

    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Deciembre'
    ];

    const data = {
      labels: labels,
      datasets: [
        {label: 'Mantenimiento de equipo',
        fill: false,
        borderColor: COLORS[6],
        backgroundColor: 'transparent',
        pointBorderColor: COLORS[6],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
          data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
        },
        {label: 'Asesoria tecnica',
        fill: false,
        borderColor: COLORS[0],
        backgroundColor: 'transparent',
        pointBorderColor: COLORS[0],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
          data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
        },
        {label: 'Daño de equipo',
        fill: false,
        borderColor: COLORS[1],
        backgroundColor: 'transparent',
        pointBorderColor: COLORS[1],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
          data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
        }
      ]
    };

    var lineChart = new Chart(speedCanvas2, {
      type: 'line',
      hover: true,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      }
    });



    var usuariosTecnicos = document.getElementById("usuariosTecnicos");
    const dataUsuariosTecnicos = {
      labels: [
        "Armando",
        "Claudia",
        "Andres",
        "Cristian"
      ],
      datasets: [
        {label: 'Mantenimiento de equipo',
        fill: false,
        borderColor: COLORS[6],
        backgroundColor: 'transparent',
        pointBorderColor: COLORS[6],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
          data: [300, 310, 316, 322]
        },
        {label: 'Asesoria tecnica',
        fill: false,
        borderColor: COLORS[0],
        backgroundColor: 'transparent',
        pointBorderColor: COLORS[0],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
          data: [320, 340, 365, 360]
        },
        {label: 'Daño de equipo',
        fill: false,
        borderColor: COLORS[1],
        backgroundColor: 'transparent',
        pointBorderColor: COLORS[1],
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
          data: [370, 394, 415, 409]
        }
      ]
    };

    new Chart(usuariosTecnicos, {
      type: 'line',
      hover: true,
      data: dataUsuariosTecnicos,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      }
    });
}
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){
    this.BaseService.postJson('MesaDeAyuda','estadisticas').subscribe(res=>{
      if (res.RESPUESTA == "EXITO") {
        this.datos = res.DATOS;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

  exportar(){
    this.BaseService.exportarArchivo('MesaDeAyuda','exportar').subscribe(res=>{
      if (res.RESPUESTA == "EXITO") {
        var a = document.createElement('a');
        a.href  = Endpoind.ARCHIVOS+"UTILIDADES/reporteGeneral.xlsx"; 
        a.target      = '';
        a.download    = 'reporteGeneral.xlsx';
        document.body.appendChild(a);
        a.click();
        this.SweetalertService.notificacion("success", "Exportaciòn exitosa")
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }


}
