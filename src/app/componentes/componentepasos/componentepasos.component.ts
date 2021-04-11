import { Component, OnInit } from '@angular/core';
import { ConsultaCentralesService } from 'src/app/servicios/consultaCentrales.service';
import { ScanparamsService } from 'src/app/servicios/scanparams.service';

@Component({
  selector: 'app-componentepasos',
  templateUrl: './componentepasos.component.html',
  styleUrls: ['./componentepasos.component.scss']
})
export class ComponentepasosComponent implements OnInit {

  constructor(public consultaCentrales: ConsultaCentralesService,
              public scanParams: ScanparamsService) { }

  ngOnInit() {
  }

}
