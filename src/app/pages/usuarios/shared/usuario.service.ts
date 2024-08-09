import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../shared/usario.model';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) {}

    recuperarTodos(): Observable<Usuario[]> {
        const URL = `${environment.urlBase}/usuarios`

        return this.http.get(URL).pipe(
            map(this.converterParaUsuarios)
        )

    }

    recuperarPorId(id: number): Observable<Usuario> {
        const URL = `${environment.urlBase}/usuarios/${id}`

        return this.http.get(URL).pipe(
            map(this.converteParaUsuario)
        )

    }

    editar(id: number, nome: string, email: string): Observable<Usuario> {
        const URL = `${environment.urlBase}/usuarios/${id}`

        return this.http.put(URL, {
            nome: nome,
            id: id,
            email: email
        }).pipe(
            map(this.converteParaUsuario)
        )
    }

    desativar(usuarioID: Number): Observable<any> {
        const URL = `${environment.urlBase}/usuarios/${usuarioID}`
        return this.http.delete(URL, { responseType: 'json' })
    }

    private converterParaUsuarios(data: any): Array<Usuario> {
        const listaUsuarios: Usuario[] = [];

        data.forEach((e: any) => listaUsuarios.push(Object.assign(new Usuario, e)))

        return listaUsuarios;
    }


    private converteParaUsuario(data: any): Usuario {
        return (Object.assign(new Usuario, data))
    }

}