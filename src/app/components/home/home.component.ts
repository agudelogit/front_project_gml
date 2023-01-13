import { Component } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { PaisesService } from 'src/app/services/paises.service';
import { Country } from 'src/app/interface/country.interface';
import { Categoria } from 'src/app/interface/categoria.interface';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  usuarios: Usuario[] = [];
  categorias: Categoria[] = [];
  categoria: Categoria[] = [];
  paises: Country[] = [];
  pais: Country[] = [];

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private paisesService: PaisesService,
    private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias()
      .subscribe( categorias => this.categorias = categorias );

    this.usuarioService.getUsuarios()
      .subscribe( usuarios => this.usuarios = usuarios );

      this.paisesService.getPaises()
      .subscribe( paises => this.paises = paises );

      
  }

  editar(id: any) {
    this.router.navigate(['/actualizar', id]);
  }

  eliminarUsuario(id: any, nombre: string) {
    if (confirm("Está seguro que desea eliminar a '" + nombre + "'")) {
      this.usuarioService.eliminarUsuario(id)
        .subscribe(response => {
          if (response === 1) {
            this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)
            alert('Se ha eliminado con éxito');
          } else {
            alert('Error al eliminar el usuario');
          }
        });
    }
  }

  getCountryForId( termino: any ){
    this.pais = this.paises.filter( item => item.numericCode == termino );
    return this.pais[0].name; 
  }

  getCategoryForId( termino: any ){
    this.categoria = this.categorias.filter( item => item.id == termino );
    return this.categoria[0].descripcion; 
  }

}
