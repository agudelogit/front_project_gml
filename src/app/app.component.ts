import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_project_gml';

  constructor( private router: Router ){

  }

  listar( ){
    this.router.navigate(['/home']);
  }

  nuevo( ){
    this.router.navigate(['/nuevo']);
  }

  editarAdministrador(){
    this.router.navigate(['/actualizar/1']);
  }
}
