import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/interface/categoria.interface';
import { Country } from 'src/app/interface/country.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { CategoriasService } from 'src/app/services/categorias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit{

  usuario: Usuario = {
    "nombre": "",
    "apellido": "",
    "cedula": 0,
    "email": "",
    "pais": "",
    "direccion": "",
    "category_id": 0,
    "celular": 0
  }

  paises: Country[] = [];
  categorias: Categoria[] = [];

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*')]],
    apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*')]],
    cedula: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[0-9^\s]*')]],
    email: ['', [Validators.required, Validators.email ]],
    pais: ['', [Validators.required, Validators.minLength(2)]],
    direccion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(180)]],
    celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9^\s]*')]],
    category_id: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private paisesService: PaisesService,
    private categoriasService: CategoriasService) { }

  ngOnInit(): void {
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

    this.usuario = Object.assign(this.usuario, this.miFormulario.value);

    this.usuarioService.agregarUsuario(this.usuario)
      .subscribe(response => {
        if (response === 1) {
          this.miFormulario.reset();
          alert('Registro creado');
        } else {
          alert('Error al crear el registro');
        }
      })
  }
}
