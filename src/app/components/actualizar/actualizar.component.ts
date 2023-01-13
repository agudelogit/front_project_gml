import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/interface/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Country } from 'src/app/interface/country.interface';
import { Categoria } from 'src/app/interface/categoria.interface';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  paises: Country[] = [];
  categorias: Categoria[] = [];
  id: number  | undefined = 0;
  
  usuario: Usuario = {
    "nombre": "sss",
    "apellido": "",
    "cedula": 0,
    "email": "",
    "pais": "",
    "direccion": "",
    "category_id": 0,
    "celular": 0
  }

  miFormulario: FormGroup = this.fb.group({
    id: [],
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*')]],
    apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*')]],
    cedula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[0-9^\s]*')]],
    email: ['', [Validators.required, Validators.email]],
    pais: ['', [Validators.required ]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(180)]],
    celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9^\s]*')]],
    category_id: ['', [Validators.required]],
    created_at: [],
    updated_at: [],
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private paisesService: PaisesService,
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getUsuariosForId(id))
      )
      .subscribe( usuario => {       
        this.usuario = usuario;
        this.miFormulario.setValue( this.usuario ); 
        this.id = this.usuario.id;      
      });

      this.paisesService.getPaises().subscribe( paises => this.paises = paises );
      this.categoriasService.getCategorias().subscribe( categorias => this.categorias = categorias );     
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    this.usuario = Object.assign(this.usuario, this.miFormulario.value);

    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe(response => {
        if (response === 1) {
          alert('Actualizado con éxito');
        } else {
          alert('Error al crear el registro');
        }
      })
  }
}
