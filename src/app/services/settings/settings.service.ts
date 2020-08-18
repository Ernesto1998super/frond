import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: AjustesModel = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {

      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema( this.ajustes.theme );

    } else {
      console.log('Usando valores por defecto');

      this.aplicarTema( this.ajustes.theme );
    }
  }

  aplicarTema( theme: string ) {
    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = theme;

    this.ajustes.themeUrl = url;

    this.guardarAjustes();


}

}

class AjustesModel {
  themeUrl: string;
  theme: string;
}
