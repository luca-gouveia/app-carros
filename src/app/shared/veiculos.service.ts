import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class VeiculosService {
    URL = `${environment.urlBase}/veiculos`

    constructor(private httpClient: HttpClient) {}

    recuperarTodos() {
        return this.httpClient.get(this.URL);
    }

    recuperarPorId(id: number) {
        return this.httpClient.get(this.URL + '/' + id);
    }

    desativar(id: number) {
        return this.httpClient.delete(this.URL + '/' + id);
    }

    editar(id: number, veiculo: any) {
        return this.httpClient.put(this.URL + '/' + id, veiculo);
    }

    cadastrar(veiculo: any) {
        return this.httpClient.post(this.URL, veiculo);
    }

    vender(id: number) {
        return this.httpClient.patch(this.URL + '/' + id, {});
    }
}