import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoind } from '../endpoind';
import { UsuarioLogiadoService } from './usuario-logiado.service';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  headers = { headers: new HttpHeaders({
    'Content-Type': 'aplication/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers' : 'X-Requested-With,content-type'
  }) };
  constructor(private http: HttpClient, public UsuarioLogiadoService:UsuarioLogiadoService) { }

  getJson(url):Observable<any>{
    return this.http.get<any>(Endpoind.API_BASE+url);
  }

  postJson(controlador,operacion,Data:any={}):Observable<any>{
    Data.controlador=controlador;
    Data.operacion=operacion;
    let usuario=this.UsuarioLogiadoService.getUsuario();
    if(usuario){
      Data.usrLogin=usuario.usuarioID;
    }
    return this.http.post<any>(Endpoind.API_BASE,Data);
  }

  putJson(Data:any,url):Observable<any>{
    return this.http.patch<any>(Endpoind.API_BASE+url,Data);
  }

  postFormData(controlador,operacion,formData:any=new FormData()):Observable<any>{
    formData.append('controlador', controlador);
    formData.append('operacion', operacion);
    formData.append('usrLogin', this.UsuarioLogiadoService.getUsuario().usuarioID);
    return this.http.post<any>(Endpoind.API_BASE,formData);
  }
}
