import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formRegistro: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private toast: ToastrService, private loginService: LoginService) {
    this.formRegistro = this.criarForm();
  }

  ngOnInit(): void {
  }

  criarForm(): FormGroup {
    return this.formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    })
  }

  isFormControlInvalid(campo: string): boolean {
    return !!(this.formRegistro.get(campo)?.invalid && this.formRegistro.get(campo)?.touched)
  }

  registrar() {
    const { nome, email, senha } = this.formRegistro.value;
    this.formRegistro.reset;

    this.loginService.registrar(nome, email, senha).subscribe(
      res => {
        this.toast.success("Registro efetuado com sucesso");
        this.router.navigate(['/login']);
      },
      err => {
        this.toast.error(err);
      }
    )
  }

}
