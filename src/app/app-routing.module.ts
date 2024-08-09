import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './pages/editar/editar.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ListarComponent },
      { path: 'editar/:id', component: EditarComponent },
      { path: 'ver/:id', component: EditarComponent },
      { path: 'cadastrar', component: EditarComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
