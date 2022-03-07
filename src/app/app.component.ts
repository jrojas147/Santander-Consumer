import { Component } from '@angular/core';
import { Constantes } from '../constantes/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConsultaCentralesService } from './servicios/consultaCentrales.service';
import { ScanparamsService } from './servicios/scanparams.service';
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

declare var gtag;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  const = Constantes;
  splash = true;

  constructor(public consultaCentrales: ConsultaCentralesService,
    public scanParams: ScanparamsService,
    private router: Router) {
    this.scanParams.getParam();
    this.splashToggle();
    this.listenGoogleAnalitycs();
  }

  splashToggle() {
    setTimeout(() => {
      this.splash = false;
      this.consultaCentrales.linkOrigen = document.referrer;
    }, 2000);
  }

  listenGoogleAnalitycs() {
    const navEndEvents$ = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      );
      navEndEvents$.subscribe((event: NavigationEnd) => {
        gtag('config', 'G-6TQS25919L', {
          'page_path': event.urlAfterRedirects
        });

      });


  }
}
