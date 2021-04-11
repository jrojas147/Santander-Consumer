import { Component } from '@angular/core';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { RespuestaCalculadoraService } from 'src/app/servicios/respuestaCalculadora.service';
import { Constantes } from 'src/constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScanparamsService } from 'src/app/servicios/scanparams.service';

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
export class PasotresComponent {

  resultado: number;
  variantePreaprobado: number;
  sendMail;
  sendWhatsapp;
  const = Constantes;

  constructor(public consultaCentrales: ConsultaCentralesService,
              public respuestaCalculadora: RespuestaCalculadoraService,
              public scanParams: ScanparamsService
              ) {
    this.viabilizar();
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
        this.cleanRespuesta(respuesta);
      });

    }

  });

}

cleanRespuesta(respuesta) {
  let r = respuesta.toLowerCase();
  r = r.replace(new RegExp("\\s", 'g'),"");
  r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
  r = r.replace(new RegExp("æ", 'g'),"ae");
  r = r.replace(new RegExp("ç", 'g'),"c");
  r = r.replace(new RegExp("[èéêë]", 'g'),"e");
  r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
  r = r.replace(new RegExp("ñ", 'g'),"n");                            
  r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
  r = r.replace(new RegExp("œ", 'g'),"oe");
  r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
  r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
  r = r.replace(new RegExp("\\W", 'g'),"");

  if(r.length > 12 && this.resultado == 2){
    if(r == 'preaprobadonosevalidoingresopormareiguanosevalidoingresoporincomeestimatorpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
        this.variantePreaprobado = 21;
        this.sendMail = true;
    }
    if(r == 'preaprobadonosevalidoingresopormareiguanosevalidoingresoporincomeestimatorreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso'){
        this.variantePreaprobado = 22;
    }
    if(r == 'preaprobadopreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
        this.variantePreaprobado = 23;
        if(this.scanParams.enriquecido){
          this.sendWhatsapp = true;
        }
    }
    if(r == 'preaprobadosevalidoenmareiguaperonocumpleconcontinuidadlaboralpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
        this.variantePreaprobado = 24;
        if(this.scanParams.enriquecido){
          this.sendMail = true;
        }
    }
    if(r == 'preaprobadosevalidoenmareiguaperonocumpleconcontinuidadlaboralreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso'){
        this.variantePreaprobado = 25;
        if(this.scanParams.enriquecido){
          this.sendMail = true;
        } 
    }
    if(r == 'preaprobadonosevalidocorreoelectroniconicelularporubica'){
        this.variantePreaprobado = 26;
        if(this.scanParams.enriquecido){
        this.sendWhatsapp = true;
        }
    }
}else{
    this.variantePreaprobado = 2;
}

if(this.scanParams.enriquecido && (this.resultado == 4 || this.resultado == 3)){
  this.sendWhatsapp = true;
}
}

gotoReferrer() {
  window.location.href = this.consultaCentrales.linkOrigen;
}

}



