import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private toast: ToastrService, private loginService: LoginService) {
    this.formLogin = this.criarFormLogin();
  }

  ngOnInit(): void { }

  criarFormLogin(): FormGroup {
    return this.formBuilder.group({
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]]
    })
  }

  login() {
    const { email, senha } = this.formLogin.value;
    this.formLogin.reset;

    this.loginService.login(email, senha).subscribe(
      res => {
        this.toast.success("Login efetuado com sucesso");
        this.router.navigate(['']);
      },
      err => {
        this.toast.error(err);
      }
    )
  }
}
