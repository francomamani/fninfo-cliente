import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmergenteService} from '../emergente.service';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {NotificacionService} from '../../notificacion/notificacion.service';

@Component({
  selector: 'app-emergente-create',
  templateUrl: './emergente-create.component.html',
  styleUrls: ['./emergente-create.component.css']
})
export class EmergenteCreateComponent implements OnInit {
    notificaciones: any = null;
    emergenteGroup: FormGroup;
    imagenes: any = [
        {
            'key' : 'true',
            'value' : 'Con imagen'
        },
        {
            'key' : 'false',
            'value' : 'Sin imagen'
        }
    ];
    constructor(
        private router: Router,
        private notificacionService: NotificacionService,
        private emergenteService: EmergenteService,
        private fb: FormBuilder,
        private dialog: MatDialog) {

        notificacionService.index().subscribe(res => {
            this.notificaciones = res;
            console.log(res);
        });
    }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.emergenteGroup = this.fb.group({
            'notificacion_id': new FormControl(0, Validators.required),
            'titulo': new FormControl('', Validators.required),
            'descripcion': new FormControl('', Validators.required),
            'imagen': new FormControl('false', Validators.required)
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '500px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de notificaciones emergentes?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/emergente/listar']);
            }
            this.emergenteGroup.reset();
        });
    }

    store() {
        let notificacion_id = this.emergenteGroup.value.notificacion_id;
        notificacion_id = notificacion_id.toString();
        console.log(this.emergenteGroup.value);
        this.emergenteGroup.patchValue({
            'notificacion_id' : notificacion_id
        });
        this.emergenteService.store(this.emergenteGroup.value).subscribe(res => {
            this.emergenteService.send(res).subscribe( (response: any) => {
                console.log(response.message_id);
            });
            this.openDialog(res);
        });
    }
}
