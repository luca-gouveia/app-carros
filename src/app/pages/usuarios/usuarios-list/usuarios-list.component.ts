import { Component, OnInit } from '@angular/core';
import { Usuario } from '../shared/usario.model';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  listaUsuarios: Array<Usuario> = [];

  constructor(private usuarioService: UsuarioService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.usuarioService.recuperarTodos().subscribe(
      res => { this.listaUsuarios = res }
    )
  }

  remover(id?: Number | null | number) {
    if (id) {
      this.usuarioService.desativar(id).subscribe(
        res => {},
        err => {
          if (err?.status === 200) {
            this.toast.success(err?.error?.text);
            window.location.reload();
          } else {
            this.toast.error(err?.error?.message);
          }
        }
      )
    }
  }

}
