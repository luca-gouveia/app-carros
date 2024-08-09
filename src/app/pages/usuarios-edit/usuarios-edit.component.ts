import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../usuarios/shared/usario.model';
import { UsuarioService } from '../usuarios/shared/usuario.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit {

  formUsuario: FormGroup
  listaGeneros: string[] = [];
  id: number = 0;
  usuario: Usuario | undefined;

  constructor(private formBuilder: FormBuilder, private toast: ToastrService, private usuarioServive: UsuarioService, private activatedRoute: ActivatedRoute
    , private router: Router) {
    this.formUsuario = this.criarForm();
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recuperarPorId();
  }

  criarForm(): FormGroup {
    return this.formBuilder.group({
      id: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
    })
  }

  isFormControlInvalid(campo: string): boolean {
    return !!(this.formUsuario.get(campo)?.invalid && this.formUsuario.get(campo)?.touched)
  }

  recuperarPorId() {
    this.usuarioServive.recuperarPorId(this.id).subscribe(
      res => {
        this.usuario = res;

        this.formUsuario?.get('id')?.setValue(this.usuario.id);
        this.formUsuario?.get('nome')?.setValue(this.usuario.nome);
        this.formUsuario?.get('email')?.setValue(this.usuario.email);
      },
      err => {
        this.toast.error(err?.error?.message);
      }
    )
  }

  editar() {
    const { id, nome, email } = this.formUsuario.value;
    this.formUsuario.reset;

    this.usuarioServive.editar(id, nome, email).subscribe(
      res => {
        this.toast.success("Registro editado com sucesso");
        this.router.navigate(['usuarios']);
      },
      err => {
        this.toast.error(err?.error?.message);
      }
    )
  }

}
