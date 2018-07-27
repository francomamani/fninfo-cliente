import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import {CategoriaService} from '../categoria/categoria.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  categorias: any = null;
  environment = environment;
  constructor(private categoriaService: CategoriaService) {
    categoriaService.index().subscribe(res => this.categorias = res);
  }

  ngOnInit() {
  }

}
