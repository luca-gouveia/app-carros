import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/security/login/login.service';
import { Titulo } from '../usuarios/shared/titulo.model';
import { TituloService } from '../usuarios/shared/titulo.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  titulo: Titulo | undefined;
  tituloId: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private tituloService: TituloService,
    private toast: ToastrService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.tituloId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recuperarPorId();
  }

  recuperarPorId() {
    this.tituloService.recuperarPorId(this.tituloId).subscribe(
      res => {
        this.titulo = res;
      },
      err => {
        this.toast.error(err?.error?.message);
      }
    )
  }

  isLogado(): boolean {
    return !!this.loginService.recuperarToken();
  }

  avaliar(nota: number) {
    this.tituloService.avaliar(this.tituloId, nota).subscribe(
      res => {
        this.toast.success("Avaliação efetuada com sucesso");
        window.location.reload();
      },
      err => {
        this.toast.error(err);
      }
    )
  }

}
