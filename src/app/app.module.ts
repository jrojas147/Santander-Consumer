import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentepasosComponent } from './componentes/componentepasos/componentepasos.component';
import { PasounoComponent } from './componentes/pasouno/pasouno.component';
import { PasodosComponent } from './componentes/pasodos/pasodos.component';
import { PasotresComponent } from './componentes/pasotres/pasotres.component';
import { EncabezadoComponent } from './componentes/shared/encabezado/encabezado.component';
import { PieComponent } from './componentes/shared/pie/pie.component';

/* Externos */
import { MaterialModule } from './material/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalTycComponent } from './componentes/modal-tyc/modal-tyc.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalpreAprobadoComponent } from './componentes/shared/modalpre-aprobado/modalpre-aprobado.component';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ComponentepasosComponent,
    PasounoComponent,
    PasodosComponent,
    PasotresComponent,
    EncabezadoComponent,
    PieComponent,
    ModalTycComponent,
    ModalpreAprobadoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
