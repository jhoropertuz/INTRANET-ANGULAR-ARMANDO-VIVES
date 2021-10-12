import { Component, OnInit } from '@angular/core';
import { BaseService } from 'app/servicios/base.service';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems;
    public menuComponentes;
    usuario;
    openIndex=-1;

    constructor(public LocalStorageService:LocalStorageService , public BaseService:BaseService, public UsuarioLogiadoService:UsuarioLogiadoService){
        this.usuario=this.LocalStorageService.getDatoJson("usuario");
    }

    ngOnInit() {

      let usuarioID=this.UsuarioLogiadoService.getUsuario().usuarioID;
      this.BaseService.postJson('usuario','permisosItemMenu',{usuarioID:usuarioID}).subscribe(res=>{
        console.log(res);
        if(res.RESPUESTA=="EXITO"){
          this.menuComponentes=res.DATOS.Componentes;
          this.menuItems=res.DATOS.Items;
          console.log(this.menuItems);
            /* let estructuraItem=[];
            res.DATOS.forEach(itemMenu=>{
              let item={
                          path: itemMenu.controlOperacionRUTAANGULAR,
                          title: itemMenu.controlOperacionTITULO,
                          icon: itemMenu.controlOperacionICONO,
                          class: ( itemMenu.controlOperacionCLASECSS == "NULL" ) ? "": itemMenu.controlOperacionCLASECSS
                        }
              estructuraItem.push(item);
            });
            this.menuItems = estructuraItem.filter(menuItem => menuItem); */
          }else{
              alert(res.MENSAJE);
          }

      });
    }


}
