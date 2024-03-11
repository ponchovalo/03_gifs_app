import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gifs[] = [];

  //API KEY de giphy
  private apiKey: string = "HNrp0XsJKnPGtkS3tPoJxVKMT4EQAC9l";

  private url: string = "http://api.giphy.com/v1/gifs"

  private _tagHistory: string[] = [];

  constructor( private http: HttpClient ) {

    this.loadLocalStorage();
  }

  //getter para obtener el arreglo,
  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  //metodo para organizar el arreglo del historial, todo a minusculas,
  //validacion si el tag ya esta en el arreglo, se realiza un filtro despues, y por ultimo se agregar el tag al arreglo
  private organizeHistory(tag: string):void {
    tag = tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagHistory.unshift(tag);

    this._tagHistory = this._tagHistory.splice(0,10);

    //Guardamos en LocalStorage
    this.saveLocalStorage();

  }

  //Metodo para guardar en el LocalStorage
  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  //Metodo para cargar informacion del LocalStorage
  private loadLocalStorage():void{
    //Validacion si el localstorage es null
    if( ! localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagHistory.length === 0) return;

    this.searchTag(this._tagHistory[0])

  }


  //metodo unicamente para realizar la busqueda
  searchTag(tag: string): void {
    //validaciones que no llegue vacio y organizacion del arreglo
    if(tag.length === 0) return
    this.organizeHistory(tag);

    //Parametros de la url
    const params = new HttpParams()
      .set( 'api_key', this.apiKey)
      .set('q', tag)
      .set( 'limit', '10')

    //La url y los parametros como constantes en la peticion http.get
    this.http.get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe( resp => {
        this.gifsList = resp.data;

        console.log({gifs: this.gifsList})
      })

  }

}
