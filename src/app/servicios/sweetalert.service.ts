import { Injectable } from '@angular/core';
import swal from'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  
  constructor() { }

  modal(estado,mensaje,titulo="",footer=""){
    swal.fire({
      icon: estado,
      title: titulo,
      text: mensaje,
      footer: footer
    });
  }

  notificacion(estado,mensaje){
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: estado,
      title: mensaje
    })
  }

  confirmacion(estado,mensaje,titulo=""){
    let promesa=new Promise((resolve)=>{
      swal.fire({
        title: titulo,
        text: mensaje,
        icon: estado,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
          resolve(true);
        }else{
          resolve(false);
        }
      })
    });

    return promesa;
  }
}
