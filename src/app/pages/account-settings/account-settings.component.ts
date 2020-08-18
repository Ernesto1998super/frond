import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( private _settings: SettingsService ) { }

  ngOnInit() {
    this.selectTheme();
  }

  onChangeTheme( theme: string, link: any ) {

    this.selectedTheme(link);

    this._settings.aplicarTema( theme );
  }

  selectedTheme( link: any ) {
    let selects: any = document.getElementsByClassName('selector');

    for (let ref of selects) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  selectTheme() {
    let selects: any = document.getElementsByClassName('selector');

    let tema = this._settings.ajustes.theme;

    for (let ref of selects) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
