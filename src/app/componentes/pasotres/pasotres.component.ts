import { Component, OnInit } from '@angular/core';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { RespuestaCalculadoraService } from 'src/app/servicios/respuestaCalculadora.service';
import { Constantes } from 'src/constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScanparamsService } from 'src/app/servicios/scanparams.service';
import { MatDialog } from '@angular/material';//Nvo
import { ModalpreAprobadoComponent } from '../shared/modalpre-aprobado/modalpre-aprobado.component';//Nvo
import { ModalRespuestaComponent } from '../shared/modal-respuesta/modal-respuesta.component';

@Component({
  selector: 'app-pasotres',
  templateUrl: './pasotres.component.html',
  styleUrls: ['./pasotres.component.scss'],
  animations: [
    trigger('animationFadeOut', [
      transition(':enter', [
        style({ opacity: '1' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: '0' }))
      ]),
      state('*', style({ opacity: '1' })),
    ])
  ]
})
export class PasotresComponent implements OnInit{

  resultado: number;
  variantePreaprobado: number;
  sendMail;
  sendWhatsapp;
  const = Constantes;
  letraMensaje: string;

  constructor(private dialog: MatDialog,
    public consultaCentrales: ConsultaCentralesService,
    public respuestaCalculadora: RespuestaCalculadoraService,
    public scanParams: ScanparamsService
  ) {
    this.viabilizar();
  }
  ngOnInit(): void {
  }

  viabilizar() {
    this.consultaCentrales.observableAutenticar.subscribe((value: number) => {
      if (value === 1) {
        if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica) {
          if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica === 1) {
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica = 1;
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadIndependiente = 15;
          }
          if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica === 11) {
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica = 1;
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadIndependiente = 16;
          }
          if (this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica === 2) {
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadEconomica = 2;
            this.consultaCentrales.contactoCentrales.DatosFinancieros.ActividadIndependiente = 3;
          }
        }
        this.consultaCentrales.respuesta(this.consultaCentrales.contactoCentrales).subscribe((res: any) => {
          this.resultado = res.IdResultado;
          let respuesta = res.Resultado;
          let letraMensaje = res.ResultadoLetra;//Nuevo
            //test
            //  this.letraMensaje = 'C';
            //  this.scanParams.enriquecido = true;
            //  this.AccionMensaje('C');
          this.AccionMensaje(letraMensaje);
        });
      }
    });
  }

  AccionMensaje(letraMensaje){
    if (letraMensaje === 'A') {
      if (this.scanParams.enriquecido == true){
        this.sendWhatsapp = true;
      }
      this.procesarRespuesta();
    }
    if (letraMensaje === 'B') {
      if (this.scanParams.enriquecido == true ){
        this.sendWhatsapp = true;
      }
      this.procesarRespuesta();
    }
    if (letraMensaje === 'C' ) {
      if( this.scanParams.enriquecido == true){
        this.sendMail = true;
      }
      this.procesarRespuesta();
    }
  }
  gotoReferrer() {
    window.location.href = this.consultaCentrales.linkOrigen;
  }
  procesarModal() {
    const dialogRef = this.dialog.open(ModalpreAprobadoComponent, {
      data: this.consultaCentrales.contactoCentrales
    });
    dialogRef.afterClosed().subscribe(result => {
     // console.log('Dialog result: ${result}');
    })
  }

  procesarRespuesta(){
    const dialogRef = this.dialog.open(ModalRespuestaComponent, {
      data:  {
        sentEmail: this.sendMail,
        sendWhatsapp: this.sendWhatsapp
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     // console.log('Dialog result: ${result}');
    })
  }
}



