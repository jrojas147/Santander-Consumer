import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScanparamsService {

  roisense;
  enriquecido = false;
  roisenseBool = false;
  utm: string;
  idc: number;
  idv: number;

  constructor(private route: ActivatedRoute
              ) { }

  getParam() {
    this.route.queryParams.subscribe((data: any) => {
      if (data.roisense && data.roisense.length === 6) {
        this.roisense = data.roisense;
        this.roisenseBool = true;
      } else {
        this.roisenseBool = false;
      }
      if (data.fuente === 'enriquecido') {
        this.enriquecido = true;
      }
      if (data.utm_source) {
        this.utm = data.utm_source;
      }
      if (data.idc) {
        this.idc = Number(data.idc);
      }
      if (data.idv) {
        this.idv = Number(data.idv);
      }
    });
  }
}
