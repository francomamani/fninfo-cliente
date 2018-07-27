import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {CategoriaUbicacionService} from '../categoria-ubicacion/categoria-ubicacion.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {

  environment = environment;
  categorias : any = [];
  constructor(private categoriaUbicacionService: CategoriaUbicacionService) {
      categoriaUbicacionService.index().subscribe(res => {
          this.categorias = res;
      });
  }

  ngOnInit() {
  }

}
