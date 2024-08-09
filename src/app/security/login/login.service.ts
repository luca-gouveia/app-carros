import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private httpClient: HttpClient) {
    }

    registrar(nome: string, email: string, senha: string): Observable<any> {
        const URL = `${environment.urlBase}/auth/registrar`;

        let body = {
            nome: nome,
            email: email,
            senha: senha
        }

        return this.httpClient.post(URL, body, { responseType: 'json' }).pipe(
            map((response) => this.salvarTokenLocalStorage(response)),
            catchError((err) => {
                this.removerTokenLocalStorage();
                throw err?.error?.message || 'Falha ao registrar!';
            })
        )
    }


    login(email: string, senha: string): Observable<any> {
        const URL = `${environment.urlBase}/auth/login`;

        let body = {
            email: email,
            senha: senha
        }

        return this.httpClient.post(URL, body, { responseType: 'json' }).pipe(
            map((response) => this.salvarTokenLocalStorage(response)),
            catchError((err) => {
                this.removerTokenLocalStorage();
                throw 'Falha ao realizar o login.'
            })
        )

    }

    recuperarToken(): string | null {
        return localStorage.getItem(environment.token);
    }

    decodificarToken(token: string | null): any {
        try {
            return token ? jwtDecode(token) : null;
        } catch (Error) {
            return null;
        }
    }

    sair() {
        this.removerTokenLocalStorage();
    }

    private salvarTokenLocalStorage(response: any): void {
        const { token } = response;
        localStorage.setItem(environment.token, token)
    }

    private removerTokenLocalStorage(): void {
        localStorage.removeItem(environment.token);
    }
}