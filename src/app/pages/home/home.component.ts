import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Titulo } from '../usuarios/shared/titulo.model';
import { TituloService } from '../usuarios/shared/titulo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lista: Array<Titulo> = [];
  titulo: string | undefined;
  diretor: string | undefined;
  atores: string | undefined;
  genero: string = '';

  listaGeneros: string[] = [];

  mostrarFiltro: boolean = false;

  constructor(private tituloService: TituloService, private toast: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.recuperarTodos();
    this.recuperarGeneros();
  }

  recuperarTodos() {
    this.tituloService.recuperarTodos().subscribe(
      res => {
        this.lista = res;
      },
      err => {
        this.toast.error(err?.error?.message);
      }
    )
  }

  abrirTitulo(id?: Number) {
    if (id) {
      this.router.navigate([`titulo/${id}`]);
    }
  }

  limparFiltro() {
    this.titulo = '';
    this.diretor = '';
    this.atores = '';
    this.genero = '';

    this.recuperarTodos();
  }

  buscar() {
    if (this.titulo|| this.diretor || this.atores || this.genero) {
      this.tituloService.buscar(this.titulo, this.diretor, this.atores, this.genero).subscribe(
        res => {
          this.lista = res;
        },
        err => {
          this.toast.error(err?.error?.message);
        }
      )
    }
  }

  recuperarGeneros() {
    this.tituloService.recuperarGeneros().subscribe(
      res => {
        this.listaGeneros = res;
      },
      err => {
        this.toast.error(err?.error?.message);
      }
    )
  }
}
