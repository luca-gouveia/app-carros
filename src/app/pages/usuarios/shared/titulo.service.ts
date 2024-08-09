import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Titulo } from './titulo.model';


@Injectable({
    providedIn: 'root'
})
export class TituloService {

    constructor(private httpClient: HttpClient) {}

    recuperarTodos(): Observable<Titulo[]> {
        const URL = `${environment.urlBase}/catalogo`

        let params = new HttpParams();

        params = params.append('sort', 'id,desc');

        return this.httpClient.get(URL, { params: params }).pipe(
            map(this.converterParaTitulos)
        )

    }

    buscar(titulo?: string, diretor?: string, atores?: string, genero?: string): Observable<Titulo[]> {
        const URL = `${environment.urlBase}/catalogo/buscar`;

        let params = new HttpParams();

        params = params.append('titulo', titulo || "");
        params = params.append('diretor', diretor || "");
        params = params.append('atores', atores || "");
        params = params.append('genero', genero || "");

        return this.httpClient.get(URL, { params: params }).pipe(
            map(this.converterParaTitulos)
        )
    }

    recuperarGeneros(): Observable<string[]> {
        const URL = `${environment.urlBase}/catalogo/generos`

        return this.httpClient.get(URL).pipe(
            map(this.converterParaGeneroString)
        )
    }

    recuperarPorId(id: number): Observable<Titulo> {
        const URL = `${environment.urlBase}/catalogo/${id}`

        return this.httpClient.get(URL).pipe(
            map(this.converteParaTitulo)
        )
    }

    editar(titulo: Titulo): Observable<Titulo> {
        const URL = `${environment.urlBase}/catalogo/${titulo.id}`

        return this.httpClient.put(URL, titulo).pipe(
            map(this.converteParaTitulo)
        )
    }

    avaliar(idItemCatalogo: number, nota: number): Observable<any> {
        const URL = `${environment.urlBase}/catalogo/avaliar`;

        let body = {
            idItemCatalogo: idItemCatalogo,
            nota: nota
        }

        return this.httpClient.post(URL, body, { responseType: 'json' }).pipe(
            map((response) => {response}),
            catchError((err: any) => {
                throw 'Falha ao avaliar.'
            })
        )
    }

    cadastrar(titulo?: string, genero?: string, diretor?: string, atores?: string, descricao?: string, imdbID?: string, linkImagem?: string): Observable<any> {
        const URL = `${environment.urlBase}/catalogo`;

        let body = {
            titulo: titulo,
            genero: [genero],
            diretor: diretor,
            atores: atores,
            descricao: descricao,
            imdbID: imdbID,
            linkImagem: linkImagem
        }

        return this.httpClient.post(URL, body, { responseType: 'json' }).pipe(
            map((response) => {response}),
            catchError((err: any) => {
                throw 'Falha ao salvar.'
            })
        )
    }

    private converterParaTitulos(data: any): Array<Titulo> {
        const lista: Titulo[] = [];

        data.content.forEach((e: any) => lista.push(Object.assign(new Titulo, e)))

        return lista;
    }

    private converterParaGeneroString(data: any): Array<string> {
        const lista: string[] = [];

        data.generos.forEach((e: string) => lista.push(e))

        return lista;
    }

    private converteParaTitulo(data: any): Titulo {
        return (Object.assign(new Titulo, data))
    }

}