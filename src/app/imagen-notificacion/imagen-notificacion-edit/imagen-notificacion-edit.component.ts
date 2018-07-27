import { Component, OnInit } from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagenService} from '../../imagen/imagen.service';
import {MatDialog} from '@angular/material';
import {ImagenNotificacionService} from '../imagen-notificacion.service';

@Component({
  selector: 'app-imagen-notificacion-edit',
  templateUrl: './imagen-notificacion-edit.component.html',
  styleUrls: ['./imagen-notificacion-edit.component.css']
})
export class ImagenNotificacionEditComponent implements OnInit {

    imagenNotificacionGroup: FormGroup;
    imagenNotificacion: any = null;
    constructor(
        private imagenNotificacionService: ImagenNotificacionService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {
        route.params.subscribe(res => {
            this.imagenNotificacionService.show(res.id).subscribe( imagenNotificacion => {
                this.imagenNotificacion = imagenNotificacion;
                this.createForm(imagenNotificacion);
            });
        });
    }

    ngOnInit() {
    }

    createForm(imagenNotificacion) {
        console.log(imagenNotificacion);
        this.imagenNotificacionGroup = this.fb.group({
            'id': new FormControl(imagenNotificacion.id, Validators.required),
            'notificacion_id': new FormControl(imagenNotificacion.notificacion_id, Validators.required),
            'descripcion': new FormControl(imagenNotificacion.descripcion, Validators.required),
            'imagen': new FormControl(imagenNotificacion.imagen, Validators.required)
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
                this.router.navigate(['/notificacion/' + this.imagenNotificacion.notificacion_id + '/imagen/listar']);
            }
        });
    }

    update() {
        this.imagenNotificacionService
            .update(this.imagenNotificacionGroup.value, this.imagenNotificacionGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
