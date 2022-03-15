import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-modalinfo',
  templateUrl: './modalinfo.component.html',
  styleUrls: ['./modalinfo.component.scss']
})
export class ModalinfoComponent implements OnInit {
  tipoModal: string;

  constructor(
    private dialogRef: MatDialogRef<ModalinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInfo: {
      tipoModal: string,
      titulo: string,
      mensaje: string,
      mensaje2: string,
      tipoModalSalir: boolean,
      tipoModalDocumentos: boolean
     },
  ) {
    this.tipoModal = dataInfo.tipoModal;
  }

  ngOnInit() {
  }

  salirViabilizacion(): void{
    this.dialogRef.close(true);
  }

  Mantener(){
    this.dialogRef.close();
  }
}
