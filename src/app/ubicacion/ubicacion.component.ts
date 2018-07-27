import { Component, OnInit } from '@angular/core';
import {CategoriaUbicacionService} from '../categoria-ubicacion/categoria-ubicacion.service';
import { environment } from '../../environments/environment.prod';
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

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
