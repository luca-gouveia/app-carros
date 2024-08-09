import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class MarcasService {
    URL = `${environment.urlBase}/marcas`

    constructor(private httpClient: HttpClient) {}

    recuperarTodos() {
        return this.httpClient.get(this.URL);
    }

}