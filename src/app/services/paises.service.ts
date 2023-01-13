import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Country } from '../interface/country.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private restCountriesUrl: string = environment.restCountriesUrl;

  constructor( private http: HttpClient ) { }

  getPaises(): Observable<Country[]> {
    const url = `${this.restCountriesUrl}/regionalbloc/usan?fields=name,numericCode`;
    return this.http.get<Country[]>(url);      
  }

}
