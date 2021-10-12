import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import {ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $;


@Component({
  selector: 'app-tabla-datatable',
  templateUrl: './tabla-datatable.component.html',
  styleUrls: ['./tabla-datatable.component.css']
})
export class TablaDatatableComponent implements OnInit {

  @ViewChild('dataTable') table: ElementRef ;
  dataTable: any;
  public componente;
  public operacion;
  public tableData;
  public columnas;
  public keys;
  public idItem;
  public cantidadTotalElementos;
  public cantidadInicialAmostrar;
  mostrarTablas=false;
  selecionados=[];
  dtOption = {

    "sDom": 'T<"clear">lfrtip',
    "language": {
        "search": "Buscar:",
        "zeroRecords": "No se encontraron datos",
        "infoEmpty": "No hay datos para mostrar",
        "info": "Mostrando del _START_ al _END_, de un total de _TOTAL_ entradas",
        "paginate": {
            "first": "Primeros",
            "last": "Ultimos",
            "next": "Siguiente",
            "previous": "Anterior"
        },
    },
    "paging":   true,
    "ordering": false,
    "lengthMenu":[25,50,100],
    "destroy":true,
    "processing":true,
    "serverSide":true,
    "autoWidth": true,
    "scrollY": 600,
    "scrollX": true,
    "dom": 'Bfrtip',
    "select": "multi",
    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      const self = this;
      $('td', row).off('click');
      $('td', row).on('click', () => {
        self.selectElemto(data);
      });
      return row;
    }
  };

  constructor(private formBuilder: FormBuilder,private cdref: ChangeDetectorRef ,public BaseService:BaseService, public SweetalertService:SweetalertService) {
    
   }

  ngOnInit(): void {

  }

 /*  ngAfterViewInit() {
    this.cargarDatos("usuario","todosFiltro",{usuarioNOMBRE:'Usuario', usuarioTIPO:'Tipo', usuarioFCHCREO:'FCH Creación', usuarioESTADO:'Estado'},'usuarioID');
  } */

  cargarDatos(componente,operacion,colum,idItem,dtOption=null){
    this.idItem=idItem;
    this.componente=componente;
    this.operacion=operacion;
    this.keys=Object.keys(colum);
    this.columnas=Object.values(colum);
    this.dtOption=(dtOption==null)?this.dtOption:Object.assign(this.dtOption, dtOption);
    this.cantidadInicialAmostrar=(this.dtOption.hasOwnProperty('lengthMenu'))?this.dtOption.lengthMenu[0]:25;
    this.BaseService.postJson(componente,operacion,{cantidad:this.cantidadInicialAmostrar}).subscribe(res=>{
      if (res.RESPUESTA=="EXITO") {
        this.tableData=res.DATOS.Datos;
        this.cantidadTotalElementos=res.DATOS.CantidadTotal.cantidadTotal;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
      this.mostrarTablas=true;
      setTimeout(() => {
        this.generarDataTable();
      }, 1000);
    });
    this.cdref.detectChanges();
  }

  generarDataTable(){
    this.dtOption.lengthMenu.push(this.cantidadTotalElementos);
    this.armandoOptionAjax();
    this.armandoBotones();
    console.log(this.dtOption);
    this.dataTable=$(this.table.nativeElement).DataTable(this.dtOption);
  }

  armandoOptionAjax(){
    const that = this;
    this.dtOption["ajax"]=function (data,callback,setting){
      if(data.search.value.length==0||data.search.value.length>3){
        that.BaseService.postJson(that.componente,that.operacion,{inicioBusqueda:data.start,cantidad:data.length,busqueda:data.search.value}).subscribe(res=>{
          if (res.RESPUESTA=="EXITO") {
            let data=that.armarEstructuraDeDatos(res.DATOS);
            console.log(data);
            callback(data);
          }else{
            that.SweetalertService.modal("error",res.MENSAJE);
          }   
        });
      }
    }
    this.dtOption["deferLoading"]=this.cantidadTotalElementos;
  }

  armandoBotones(){
    const that=this;
    this.dtOption["buttons"]=[
      {
        extend: 'colvis',
        text: 'Columnas'
    },
      {
        extend: 'pdf',
        text: 'PDF'
    },
    {
        extend: 'excel',
        text: 'EXCEL'
    }
      /* {
        text: 'Select all',
        action: function () {
          that.dataTable.row().select();
        }
    },
    {
        text: 'Select none',
        action: function () {
          that.dataTable.row().deselect();
        }
    } */
    ];
  }

  armarEstructuraDeDatos(data){
    let arrayTotal = [];
    data.forEach(element => {
      let arrayElemnt = [];
      arrayElemnt.push(element[this.idItem]);
      this.keys.forEach(keyColumn => {
        arrayElemnt.push(element[keyColumn]);
      });
      arrayTotal.push(arrayElemnt);
    });
    return {
      data:arrayTotal,
      recordsTotal: data.length,
      recordsFiltered: this.cantidadTotalElementos
    };
  }

  selectElemto(info: any){
    console.log(info[0]);
    if(info[0]){
      let indexElem=this.selecionados.indexOf(info[0]);
      if(indexElem!=-1){
        this.selecionados.splice(indexElem,1);
      }else{
        this.selecionados.push(info[0]);
      }
    }
    console.log(this.selecionados);
  }

  obtenerVariosElemntosSeleccionados(){
    if(this.selecionados.length>0){
      return this.selecionados;
    }else{
      this.SweetalertService.modal("info","Por favor seleccione por lo menos un elemento.");
      return false;
    }
  }

  obtenerUnElementoSeleccionado(){
    if(this.selecionados.length>0){
      if(this.selecionados.length==1){
        return this.selecionados[0];
      }else{
        this.SweetalertService.modal("info","Por favor seleccione un solo elemento.");
      }
    }else{
      this.SweetalertService.modal("info","Por favor seleccione un elemento.");
    }
    return false;
  }


}
