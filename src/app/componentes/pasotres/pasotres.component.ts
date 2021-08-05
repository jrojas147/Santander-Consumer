import { ContactoCentrales } from './../../interfaces/contactoCentrales';
//import { ConsultaCentralesService } from './../../servicios/consultaCentrales.service';
import { Component, OnInit } from '@angular/core';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { RespuestaCalculadoraService } from 'src/app/servicios/respuestaCalculadora.service';
import { Constantes } from 'src/constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScanparamsService } from 'src/app/servicios/scanparams.service';
import { MatDialog } from '@angular/material';//Nvo
import { ModalpreAprobadoComponent } from '../shared/modalpre-aprobado/modalpre-aprobado.component';
import { ModalRespuestaComponent } from '../shared/modal-respuesta/modal-respuesta.component';
import { ModalComponent } from '../shared/modal/modal.component';


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
          let letraMensaje = res.ResultadoLetra;
            //test
              //  this.letraMensaje = 'C';
              //  this.scanParams.enriquecido = true;

          this.AccionMensaje(letraMensaje);
        });
      }
    });
  }

  AccionMensaje(letraMensaje){
    let VarianteAprobado: String
    if (letraMensaje === 'A') {
      if (this.scanParams.enriquecido == true){
        this.sendWhatsapp = true;
      }
      this.procesarRespuesta();
    }
    if (letraMensaje === 'B') {
      if (this.scanParams.enriquecido == true ){
        this.sendWhatsapp = true;
        // VarianteAprobado = 'sendWhatsapp';
      }
      this.procesarRespuesta();
    }
    if (letraMensaje === 'C' ) {
      if( this.scanParams.enriquecido == true){
        this.sendMail = true;
        // VarianteAprobado = 'sendMail';
      }
      this.procesarRespuesta();
      // this.validarTitulo;
    }
  }
  gotoReferrer() {
    window.location.href = this.consultaCentrales.linkOrigen;
  }

  procesarModalPreaprobado(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
        datacentrales : this.consultaCentrales.contactoCentrales,
        Titulo: 'Formulario Pre-Aprobado',
        Mensaje: "Falta poco, Ingresa tus datos para finalizar"

      },
      height: '300px',
      width: '380px'
    });
    dialogRef.afterClosed().subscribe(res  =>{
      console.log(res);

    })
  }

  validarTitulo( VarianteAprobado ) :string {
    let tituloRespuesta;
    if(VarianteAprobado == 'sendMail'){
      tituloRespuesta : 'Para finalizar solo tienes que diligenciar el siguiente formato. Te estaremos contactando pronto';
    }
    if(VarianteAprobado == 'sendWhatsapp'){
      tituloRespuesta = 'Te estamos contactando con nuestro asesor mediante whatsapp';
    }
    return tituloRespuesta
  }

  procesarModalRespuesta(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
        datacentrales : this.consultaCentrales.contactoCentrales,
      tituloRespuesta : 'Para finalizar solo tienes que diligenciar el siguiente formato. Te estaremos contactando pronto',
      Titulo: 'Titulo Variable',
      Mensaje: 'Pendiente definir mensaje '
      },
      height: '400px',
      width: '600px',
    });
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
      },
    //  disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
     // console.log('Dialog result: ${result}');
    })
  }

  // cerrarModal(){
  //   this.dialogRef.close();
  // }


}



