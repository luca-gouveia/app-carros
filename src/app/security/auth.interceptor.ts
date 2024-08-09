import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.loginService.recuperarToken();

        if (token !== null && token !== undefined) {
            const authResquest = request.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } })
            return next.handle(authResquest);
        }

        return next.handle(request);
    }
}