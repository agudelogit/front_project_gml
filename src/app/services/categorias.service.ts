import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interface/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getCategorias(): Observable<Categoria[]> {
    const url = `${this.baseUrl}/categories`;
    return this.http.get<Categoria[]>(url);      
  }
}
