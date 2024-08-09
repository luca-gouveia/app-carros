import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarcasService } from 'src/app/shared/marcas.service';
import { VeiculosService } from 'src/app/shared/veiculos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  formVeiculo: FormGroup;
  id: number = 0;
  veiculo: any;
  marcas: any[] = [];
  isVisualizacao: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private toast: ToastrService, 
    private veiculoService: VeiculosService, 
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private marcasService: MarcasService) {
    this.formVeiculo = this.criarForm();
  }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recuperarMarcas();
    this.recuperarVeiculo();

    if (this.router.url.includes('/ver')) {
      this.isVisualizacao = true;
      this.formVeiculo.controls['marca'].disable();
      this.formVeiculo.controls['ano'].disable();
      this.formVeiculo.controls['descricao'].disable();
    }
  }

  recuperarMarcas(): void {
    this.marcasService.recuperarTodos().subscribe((resp: any) => {
      if (resp) {
        this.marcas = resp;
      }
    })
  }

  recuperarVeiculo(): void {
    this.veiculoService.recuperarPorId(this.id).subscribe((resp: any) => {
      if (resp) {
        this.veiculo = resp;

        this.formVeiculo?.get('ano')?.setValue(this.veiculo.ano);
        this.formVeiculo?.get('descricao')?.setValue(this.veiculo.descricao);
        this.formVeiculo?.get('marca')?.setValue(this.veiculo.sigla);
      }
    })
  }

  criarForm(): FormGroup {
    return this.formBuilder.group({
      marca: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
    })
  }

  isFormControlInvalid(campo: string): boolean {
    return !!(this.formVeiculo.get(campo)?.invalid && this.formVeiculo.get(campo)?.touched)
  }

  editar() {
    const { marca, ano, descricao } = this.formVeiculo.value;
    this.formVeiculo.reset;

    this.veiculoService.editar(this.id, { marca: marca, ano: ano, descricao: descricao }).subscribe((resp: any) => {
      if (resp) {
        this.toast.success("Registro editado com sucesso");
        this.router.navigate(['']);
      }
    }, (err) => {
      this.toast.error("Erro ao editar");
    })
  }

  cadastrar() {
    const { marca, ano, descricao } = this.formVeiculo.value;
    this.formVeiculo.reset;

    this.veiculoService.cadastrar({ marca: marca, ano: ano, descricao: descricao }).subscribe((resp: any) => {
      this.toast.success("Cadastrado editado com sucesso");
        this.router.navigate(['']);
    }, (err) => {
      this.toast.error("Erro ao cadastrar");
    })
  }
}
