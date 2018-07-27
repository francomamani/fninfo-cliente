import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ImagenService} from '../../imagen/imagen.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-imagen-edit',
  templateUrl: './imagen-edit.component.html',
  styleUrls: ['./imagen-edit.component.css']
})
export class ImagenEditComponent implements OnInit {
    imagenGroup: FormGroup;
    imagen: any = null;
    constructor(
        private imagenService: ImagenService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {
        route.params.subscribe(res => {
            imagenService.show(res.id).subscribe( imagen => {
                this.imagen = imagen;
                this.createForm(imagen);
            });
        });
    }

    ngOnInit() {
    }

    createForm(imagen) {
        this.imagenGroup = this.fb.group({
            'id': new FormControl(imagen.id, Validators.required),
            'ubicacion_id': new FormControl(imagen.ubicacion_id, Validators.required),
            'descripcion': new FormControl(imagen.descripcion, Validators.required),
            'imagen': new FormControl(imagen.imagen, Validators.required)
        });
    }
    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '350px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de imagenes de ubicaciones?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/ubicacion/' + this.imagen.ubicacion_id + '/imagen/listar']);
            }
        });
    }

    update() {
        this.imagenService
            .update(this.imagenGroup.value, this.imagenGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
