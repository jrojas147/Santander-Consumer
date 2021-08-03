import { Constantes } from './../../../../constantes/constantes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { PasotresComponent } from '../../pasotres/pasotres.component';
import { ModalpreAprobadoComponent } from '../modalpre-aprobado/modalpre-aprobado.component';


@Component({
  selector: 'app-modal-respuesta',
  templateUrl: './modal-respuesta.component.html',
  styleUrls: ['./modal-respuesta.component.scss']
})
export class ModalRespuestaComponent implements OnInit {
  const = Constantes;
  sendMail:boolean =  false;
  sendWhatsapp:boolean = true;
  TituloMensaje: string;
  BodyMensaje: string;

  MensajeTitulo:string = 'Estas a punto de cumplir tus sueños';
  MensajeChat:string = 'Te estamos contactando con nuestro asesor mediante whatsapp';
  MensajeEmail:string = 'Para finalizar solo tienes que diligenciar el siguiente formato. Te estaremos contactando pronto';


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public consultaCentrales: ConsultaCentralesService,
   // public pasotress: PasotresComponent,//Nuevo
    public dialogRef: MatDialogRef<ModalRespuestaComponent>,
  ) {
    }

    ngOnInit() {
      //console.log(this.data)
      this.directWhatsapp();
    }

  procesarModal() {
    const dialogRef = this.dialog.open(ModalpreAprobadoComponent, {
      data: this.consultaCentrales.contactoCentrales
    });
    dialogRef.afterClosed().subscribe(result => {
     // console.log('Dialog result: ${result}');
    })
  }

  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }

  directWhatsapp():void{
    if (this.data.sendWhatsapp == true){
      setTimeout( () => {
        this.ConectarWhatsapp();
      },5000)
    }
  }

}
