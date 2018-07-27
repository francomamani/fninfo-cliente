import { Component, OnInit } from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {NotificacionService} from '../notificacion.service';

@Component({
  selector: 'app-notificacion-edit',
  templateUrl: './notificacion-edit.component.html',
  styleUrls: ['./notificacion-edit.component.css']
})
export class NotificacionEditComponent implements OnInit {
    notificacionGroup: FormGroup;
    notificacion: any = null;
    notificacion_id: number = null;
    constructor(
        private notificacionService: NotificacionService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            this.notificacion_id = res.id;
            notificacionService.show(res.id).subscribe( notificacion => {
                this.notificacion = notificacion;
                this.createForm(notificacion);
            });
        });
    }

    ngOnInit() {
    }

    createForm(notificacion) {
        console.log(this.notificacion);
        this.notificacionGroup = this.fb.group({
            'categoria_id': new FormControl(notificacion.categoria_id, Validators.required),
            'ubicacion_id': new FormControl(notificacion.ubicacion_id, Validators.required),
            'user_id': new FormControl(notificacion.user_id, Validators.required),
            'titulo': new FormControl(notificacion.titulo, Validators.required),
            'contenido': new FormControl(notificacion.contenido, Validators.required),
            'imagen': new FormControl(notificacion.imagen, Validators.required),
            'fecha_inicio': new FormControl(new Date(notificacion.fecha_inicio)),
            'fecha_fin': new FormControl(new Date(notificacion.fecha_fin)),
            'web': new FormControl(notificacion.web),
            'prioridad': new FormControl(notificacion.prioridad, Validators.required)
        });
    }
    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de notificaciones?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if(response === true) {
                this.router.navigate(['/notificacion/listar']);
            }
        });

    }

    update() {
        this.notificacionGroup.patchValue({
            fecha_inicio: this.notificacionGroup.value.fecha_inicio.getTime(),
            fecha_fin: this.notificacionGroup.value.fecha_fin.getTime()
        });
        this.notificacionService
            .update(this.notificacionGroup.value, this.notificacion_id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
