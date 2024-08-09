import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VeiculosService } from 'src/app/shared/veiculos.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  veiculos: any[] = [];

  constructor(private veiculoService: VeiculosService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.veiculoService.recuperarTodos().subscribe((resp: any) => {

      if (!resp.empty) {
        this.veiculos = resp.content;
      }
    })
  }

  remover(id: number) {
    var resposta = confirm("Remover?");

    if (resposta) {
      this.veiculoService.desativar(id).subscribe((resp: any) => {},
       (err) => {
        if (err?.status === 200) {
          this.toast.success("Deletado com sucesso");
          this.ngOnInit();
        } else {
          this.toast.error("Erro ao remover");
        }
      });
    }
  }

  vender(id: number) {
    this.veiculoService.vender(id).subscribe((resp: any) => {
      if (resp) {
        this.toast.success("Vendido com sucesso");
        this.ngOnInit();
      }
    },
     (err) => {
      this.toast.error("Erro ao vender");
    });
  }

}
