import { Component, OnInit } from '@angular/core';
import {CategoriaUbicacionService} from '../categoria-ubicacion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-categoria-ubicacion-edit',
  templateUrl: './categoria-ubicacion-edit.component.html',
  styleUrls: ['./categoria-ubicacion-edit.component.css']
})
export class CategoriaUbicacionEditComponent implements OnInit {
  categoriaUbicacionGroup: FormGroup;
  categoria_ubicacion : any = null;
  color: any = '';
  constructor(
      private categoriaUbicacionService: CategoriaUbicacionService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private dialog: MatDialog) {

      route.params.subscribe(res => {
        categoriaUbicacionService.show(res.id).subscribe( categoria_ubicacion => {
          this.categoria_ubicacion = categoria_ubicacion;
          this.createForm(categoria_ubicacion);
        });
      });
  }

  ngOnInit() {
  }

  createForm(categoria_ubicacion) {
    console.log(this.categoria_ubicacion);
    this.color = this.categoria_ubicacion.color;
    this.categoriaUbicacionGroup = this.fb.group({
        'id': new FormControl(categoria_ubicacion.id, Validators.required),
        'nombre': new FormControl(categoria_ubicacion.nombre, Validators.required),
        'descripcion': new FormControl(categoria_ubicacion.descripcion, Validators.required),
        'icono': new FormControl(categoria_ubicacion.icono, Validators.required),
        'color': new FormControl(categoria_ubicacion.color, Validators.required)
    });
  }
  openDialog(res) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width: '450px',
          data: {
              info: res.mensaje + ' ¿Desea volver al listado de categoria de ubicaciones?',
              has_action: true
          }
      });

      dialogRef.afterClosed().subscribe(response => {
          if(response === true) {
              this.router.navigate(['/categoria-ubicacion/listar']);
          }
      });

  }

  update() {
    this.categoriaUbicacionGroup.patchValue({ color: this.color});
    this.categoriaUbicacionService
        .update(this.categoriaUbicacionGroup.value, this.categoriaUbicacionGroup.value.id)
        .subscribe(res => {
            console.log(res);
            this.openDialog(res);
        });
  }
}
