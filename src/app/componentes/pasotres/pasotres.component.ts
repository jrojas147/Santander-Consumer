import { ContactoCentrales } from './../../interfaces/contactoCentrales';
//import { ConsultaCentralesService } from './../../servicios/consultaCentrales.service';
import { Component, OnInit } from '@angular/core';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { RespuestaCalculadoraService } from 'src/app/servicios/respuestaCalculadora.service';
import { Constantes } from 'src/constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScanparamsService } from 'src/app/servicios/scanparams.service';
import { MatDialog } from '@angular/material';//Nvo
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
  sendMail: boolean;
  sendWhatsapp: boolean;
  const = Constantes;
  letraMensaje: string;
  TituloModRespuesta: string;
  MensajeModRespuesta: string;
  VarianteAprobado: string;
  TipoModal: string;
  RespuestaModalRespuesta: any;
  dialogRef: any;
  ejecutarFormularioPreaprobado: boolean = false;
  actividadEconomicaValue: number;

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
            this.actividadEconomicaValue = 11;
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
          this.letraMensaje = res.ResultadoLetra;
          this.scanParams.enriquecido;
          this.AccionMensaje(this.letraMensaje);
            //test
               this.letraMensaje = 'A';
               this.scanParams.enriquecido = true;
               this.AccionMensaje(this.letraMensaje);
        });
      }
    });
  }

  AccionMensaje(letraMensaje){
    if (letraMensaje === 'A') {
      if (this.scanParams.enriquecido == true){
        this.sendWhatsapp = true;
        this.VarianteAprobado = 'sendWhatsapp';
        this.validarTituloModalRespuesta();
        this.procesarModalRespuesta();
      }
    }
    if (letraMensaje === 'B') {
      if (this.scanParams.enriquecido == true ){
        this.sendWhatsapp = true;
        this.VarianteAprobado = 'sendWhatsapp';
        this.validarTituloModalRespuesta();
        this.procesarModalRespuesta();
      }
    }
    if (letraMensaje === 'C' ) {
      if( this.scanParams.enriquecido == true){
        this.sendMail = true;
         this.VarianteAprobado = 'sendMail';
         this.validarTituloModalRespuesta();
         this.procesarModalRespuesta();

      }
    }
  }

  gotoReferrer() {
    window.location.href = this.consultaCentrales.linkOrigen;
  }

  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }

  validarTituloModalRespuesta():void{
    if ( this.VarianteAprobado =='sendMail' ){
      this.TituloModRespuesta = 'Credito Pre-Aprobado';
      this.MensajeModRespuesta = 'Estas a punto de cumplir tus sueños, para finalizar solo tienes que diligenciar el siguiente formato. Te estaremos contactando pronto';
    }
    if ( this.VarianteAprobado =='sendWhatsapp' ){
      this.TituloModRespuesta = 'Credito Pre-Aprobado';
      this.MensajeModRespuesta = 'Estas a punto de cumplir tus sueños, te estamos contactando con nuestro asesor mediante WhatsApp';
    }
  }

  procesarModalRespuesta(): void{
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
      datacentrales : this.consultaCentrales.contactoCentrales,
      Titulo: this.TituloModRespuesta,
      Mensaje: this.MensajeModRespuesta,
      sentEmail: this.sendMail,
      sendWhatsapp: this.sendWhatsapp,
      tipoModal: 'Generico',
      ejecutarFormularioPreaprobado: this.ejecutarFormularioPreaprobado
      },
      disableClose : true,
      height: '270px',
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(`Ejecutar formulario preaprobado ${result}`)
      if(result === true){
        this.procesarModalPreaprobado();
      }
    })
  }

  procesarModalPreaprobado(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
        datacentrales : this.consultaCentrales.contactoCentrales,
        Titulo: 'Formulario Pre-Aprobado',
        Mensaje: "Falta poco, Ingresa tus datos para finalizar",
        tipoModal: 'FormularioPreAprobado',
        tipoActividadEconomica : this.actividadEconomicaValue
      },
      disableClose : true,
      height: '700px',
      width: '680px',

    });
    dialogRef.disableClose = true,
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(result);
    })
  }

  procesarModalConfirmacionSalir(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
        Titulo: '',
        Mensaje: "Estas Seguro que deseas salir?",
        tipoModal: 'ConirmacionSalir',
      },
      disableClose : true,
      height: '100px',
      width: '2000px'
    });
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(result);
    })
  }
}



