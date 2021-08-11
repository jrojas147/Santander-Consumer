import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constantes } from '../../../constantes/constantes';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { RespuestaCalculadoraService } from 'src/app/servicios/respuestaCalculadora.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TouchedErrorStateMatcher } from '../shared/touchedErrorStateMatcher';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material';//Nvo
import { ModalinfoComponent } from '../shared/modal-Info/modalinfo.component';


@Component({
  selector: 'app-pasouno',
  templateUrl: './pasouno.component.html',
  styleUrls: ['./pasouno.component.scss'],
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
export class PasounoComponent {

  primero: FormGroup;
  const = Constantes;
  porcentaje: number = 0;
  matcher = new TouchedErrorStateMatcher;
  ////Temporañ
  tituloModalInfo: String
  mensajeModalInfo: String
  mensajeModalInfo2: string
  ModalConfirmSalir:  boolean = false
  ModalAvisoDocumentos: boolean = false


  constructor( private dialog: MatDialog,
               public formBuilder: FormBuilder,
               public consultaCentrales: ConsultaCentralesService,
               public respuestaCalculadora: RespuestaCalculadoraService) {
    this.crearFormulario();
    this.statusCambia();
    ////Joan
    this.tituloModalInfo = 'Recuerda adjuntar documentos:'
    this.mensajeModalInfo = 'Si eres empleado a término indefinido, fijo o por obra/labor antiguedad mayor a 12 meses, debes enviar el/los certificado(s) que lo demuestren.'
    this.mensajeModalInfo2 = 'Si eres empleado por prestación de servicios debes haber trabajado los últimos 24 meses y debes enviar el/los contrato(s) o carta laboral y enviar los últimos 3 extractos bancarios.'
    this.ModalAvisoDocumentos = true


   }

  crearFormulario() {
    this.primero = this.formBuilder.group({
      precio: ['', [Validators.required, Validators.min(this.const.precioMinimo)]],
      modelo: ['', [Validators.required]],
      cuotaInicial: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(this.const.minimo)]],
      periodo: ['', Validators.required],
      cuota: [0, Validators.required]
    });

    this.primero.controls['monto'].disable();

    /* Subcripción de Resultados */
    this.primero.controls['monto'].valueChanges.subscribe( value => {
      this.consultaCentrales.contactoCentrales.OtrosDatos.ValorFinanciar = value;
      if (this.primero.get('periodo').value) {
        this.primero.controls['cuota'].setValue(this.respuestaCalculadora.calcularCuota(this.primero.get('periodo').value, this.primero.get('monto').value));
      }
    });

    this.primero.controls['precio'].valueChanges.subscribe( value => {
      this.consultaCentrales.contactoCentrales.DatosBasicos.ValorVehiculo = value;
      this.makeCuotaInicial();
    });

    this.primero.controls['periodo'].valueChanges.subscribe( () => {
        this.primero.controls['cuota'].setValue(this.respuestaCalculadora.calcularCuota(this.primero.get('periodo').value, this.primero.get('monto').value));
        this.consultaCentrales.contactoCentrales.DatosBasicos.Plazo = this.aniosPeriodo(this.primero.get('periodo').value);
    });

    this.primero.controls['cuotaInicial'].valueChanges.subscribe( () => {
      this.makeValorTotal(this.consultaCentrales.contactoCentrales.DatosBasicos.ValorVehiculo, Number(this.primero.controls['cuotaInicial'].value));
    });

    this.primero.controls['modelo'].valueChanges.subscribe( value => {
      this.consultaCentrales.contactoCentrales.DatosVehiculo.Modelo = value;
    });
  }

  makeCuotaInicial(){
    this.consultaCentrales.contactoCentrales.DatosBasicos.CuotaInicial = this.primero.controls['precio'].value * 0.1;
    this.primero.controls['cuotaInicial'].setValue(this.primero.controls['precio'].value * 0.1);
    this.calculaPorcentaje();
    this.makeValorTotal(this.consultaCentrales.contactoCentrales.DatosBasicos.ValorVehiculo, this.consultaCentrales.contactoCentrales.DatosBasicos.CuotaInicial);
}

  makeValorTotal(valorVehiculo, cuotaInicial){
    this.consultaCentrales.contactoCentrales.OtrosDatos.ValorFinanciar = valorVehiculo - cuotaInicial;
    this.primero.controls['monto'].setValue(valorVehiculo - cuotaInicial);
    this.calculaPorcentaje();

  }

  calculaPorcentaje(){
    this.porcentaje = (Number(this.primero.controls['cuotaInicial'].value) * 100) / this.primero.controls['precio'].value;
  }

  statusCambia() {
    this.primero.statusChanges.subscribe(val => {
      val === 'VALID' ? this.consultaCentrales.primeroCompleto = true : this.consultaCentrales.primeroCompleto = false;
    });
  }

  aniosPeriodo( value ){
    switch (value) {
      case 48:
        value = 4;
        break;

      case 60:
        value = 5;
        break;

      case 72:
        value = 6;
        break;

      case 84:
        value = 7;
        break;

      default:
        break;
    }
    return value.toString();
  }

  get montoNoValido() {
    const test = this.primero.getRawValue();
    if (test.monto < this.const.minimo) {
      return true;
    }
  }
  get precioNoValido() {
    return this.primero.get('precio').invalid && this.primero.get('precio').touched;
  }

  get cuotaInicialNoValido() {
    return this.primero.get('cuotaInicial').invalid && this.primero.controls['cuotaInicial'].touched;
  }

  get cuotaInicialMayor(){
    return Number(this.primero.get('cuotaInicial').value) > Number(this.primero.get('precio').value);
  }

  get tipoIdNoValido() {
    return this.primero.controls['modelo'].value == 0 || this.primero.controls['modelo'].value == "";
  }

  ejecutarModalInfo(){
    const dialogRef =this.dialog.open(ModalinfoComponent, {
      data: {
        titulo : this.tituloModalInfo,
        mensaje : this.mensajeModalInfo,
        mensaje2: this.mensajeModalInfo2,
        tipoModalSalir : this.ModalConfirmSalir,
        tipoModalDocumentos : this.ModalAvisoDocumentos
      },
      disableClose : true,
       height: '270px',//
       width: '560px',//
    });
    dialogRef.afterClosed().subscribe(result  =>{
      if (result && this.ModalConfirmSalir){
       // this.cerrar();
      }
      if (result && this.ModalAvisoDocumentos ){
      //  this.onsubmit();//Validar
      }
    })
  }

}
