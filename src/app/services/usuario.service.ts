import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from "../interface/usuario.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${ this.baseUrl }/users`);
  }

  agregarUsuario( usuario: Usuario ): Observable<number>{
    return this.http.post<number>(`${ this.baseUrl }/user`, usuario);  
  }

  actualizarUsuario( usuario: Usuario ): Observable<number>{
    return this.http.put<number>(`${ this.baseUrl }/user/${ usuario.id }`, usuario);
  }

  eliminarUsuario( id: string ): Observable<any>{
    return this.http.delete<any>(`${ this.baseUrl }/user/${ id }`);
  }

  getUsuariosForId( id: string ): Observable<Usuario>{
    return this.http.get<Usuario>(`${ this.baseUrl }/user/${id}`);
  }
}
