import { Constantes } from './../../../../constantes/constantes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  const = Constantes;
  //Titulo: string = 'Titulo';
  //Mensaje: string = 'Siempre estoy haciendo lo que no puedo hacer para poder aprender como hacerlo';


  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public datapersonal: {
      Titulo: string,
       Mensaje: string
     }) {

  }

  cerrar(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
