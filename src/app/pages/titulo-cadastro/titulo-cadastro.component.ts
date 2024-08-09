import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TituloService } from '../usuarios/shared/titulo.service';

@Component({
  selector: 'app-titulo-cadastro',
  templateUrl: './titulo-cadastro.component.html',
  styleUrls: ['./titulo-cadastro.component.css']
})
export class TituloCadastroComponent implements OnInit {

  formTitulo: FormGroup;
  listaGeneros: string[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private toast: ToastrService, private tituloService: TituloService) {
    this.formTitulo = this.criarForm();
  }

  ngOnInit(): void {
    this.recuperarGeneros();
  }

  criarForm(): FormGroup {
    return this.formBuilder.group({
      titulo: [null, [Validators.required]],
      diretor: [null, [Validators.required]],
      atores: [null, [Validators.required]],
      genero: [''],
      descricao: [null, [Validators.required]],
      imdbID: [null],
      linkImagem: [null],
    })
  }

  isFormControlInvalid(campo: string): boolean {
    return !!(this.formTitulo.get(campo)?.invalid && this.formTitulo.get(campo)?.touched)
  }

  recuperarGeneros() {
    this.tituloService.recuperarGeneros().subscribe(
      res => {
        this.listaGeneros = res;
        console.log(res);
        
      },
      err => {
        this.toast.error(err?.error?.message);
      }
    )
  }

  cadastrarTitulo() {
    const { titulo,
      diretor,
      atores,
      genero,
      descricao,
      imdbID,
      linkImagem } = this.formTitulo.value;
    this.formTitulo.reset;

    this.tituloService.cadastrar(titulo, genero, diretor, atores, descricao, imdbID, linkImagem).subscribe(
      res => {
        this.toast.success("Cadastro efetuado com sucesso");
        this.router.navigate(['']);
      },
      err => {
        this.toast.error(err);
      }
    )
  }

}
