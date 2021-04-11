import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProfissionaisComponent } from './profissionais/profissionais.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { SigninComponent } from './signin/signin.component';
import { UnidadesComponent } from './unidades/unidades.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'profissionais', component: ProfissionaisComponent },
  { path: 'unidades', component: UnidadesComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'dashboard', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
