import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { CadastroComponent } from './profissionais/cadastro/cadastro.component';
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';
import { MainComponent } from './main/main.component';
import { ProfissionaisComponent } from './profissionais/profissionais.component';
import { NgxMaskModule } from 'ngx-mask';
import { UnidadesComponent } from './unidades/unidades.component';
import { CadastroUnidadesComponent } from './unidades/cadastro/cadastro.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    CadastroComponent,
    ProfissionaisComponent,
    MainComponent,
    UnidadesComponent,
    CadastroUnidadesComponent,
    RelatoriosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxCoolDialogsModule.forRoot({
      theme: "default",
      okButtonText: "Sim",
      cancelButtonText: "Não",
      color: "#EC7000",
      titles: {
        alert: "Atenção!",
        confirm: "Confirmar",
        prompt: "Informe"
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
