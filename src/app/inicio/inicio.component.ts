import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {CategoriaUbicacionService} from '../categoria-ubicacion/categoria-ubicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  categoriaUbicaciones: Array<any>;
  ubicaciones: Array<any>;
  environment = environment;
  constructor(private categoriaUbicacionService: CategoriaUbicacionService) {
      this.categoriaUbicacionService.index().subscribe( (categoriaUbicaciones: Array<any>) => {
          this.categoriaUbicaciones = categoriaUbicaciones;
          console.log(this.categoriaUbicaciones);
          console.log('example');
      });
  }

  ngOnInit() {
  }

}
