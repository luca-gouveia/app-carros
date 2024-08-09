import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { LoginService } from './login/login.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const token = this.loginService.recuperarToken();
        const tokenInfo = this.loginService.decodificarToken(token);
        const role = tokenInfo?.role; 

        console.log(role);

        if (!token || role !== 'ADMIN') {
            this.router.navigate(['login'])
            return false;
        }
        return true;
    }
}