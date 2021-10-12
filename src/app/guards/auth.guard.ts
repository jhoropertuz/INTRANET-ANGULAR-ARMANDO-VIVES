import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public SweetalertService:SweetalertService,private router: Router, private LocalStorageService:LocalStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let usuario=this.LocalStorageService.getDatoJson("usuario");
    if(usuario){

        return true;

    }else{
      this.router.navigateByUrl("login");
      return false;
    }


  }

}
