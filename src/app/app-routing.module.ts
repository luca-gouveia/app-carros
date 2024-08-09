import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListarComponent } from './pages/listar/listar.component';
import { TituloCadastroComponent } from './pages/titulo-cadastro/titulo-cadastro.component';
import { TituloComponent } from './pages/titulo/titulo.component';
import { UsuariosListComponent } from './pages/usuarios/usuarios-list/usuarios-list.component';
import { EditarComponent } from './pages/editar/editar.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListarComponent },
      { path: 'editar/:id', component: EditarComponent },
      { path: 'ver/:id', component: EditarComponent },
      { path: 'cadastrar', component: EditarComponent },
      // { path: 'titulo-cadastro', component: TituloCadastroComponent},
      // { path: 'usuarios/editar/:id', component: UsuariosListComponent},
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
