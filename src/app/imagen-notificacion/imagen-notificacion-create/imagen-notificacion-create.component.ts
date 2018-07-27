import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {ImagenNotificacionService} from '../imagen-notificacion.service';

@Component({
  selector: 'app-imagen-notificacion-create',
  templateUrl: './imagen-notificacion-create.component.html',
  styleUrls: ['./imagen-notificacion-create.component.css']
})
export class ImagenNotificacionCreateComponent implements OnInit {
    @ViewChild('imagen') imagen;
    imagenNotificacionGroup: FormGroup;
    notificacion_id: number = null;
    // api/notificacion/:id/imagen
    constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private imagenNotificacionService: ImagenNotificacionService) {
        this.route.parent.params.subscribe(res => {
            console.log(res);
            this.notificacion_id = res.id;
            this.createForm(res.id);
        });
    }

    ngOnInit() {
    }
    createForm(notificacion_id) {
        this.imagenNotificacionGroup = this.fb.group({
            notificacion_id: new FormControl(notificacion_id),
            descripcion: new FormControl('', [Validators.required]),
            imagen: new FormControl('', [Validators.required])
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '400px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de imagenes de notificaciones?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if ( response === true) {
                this.router.navigate(['/notificacion/' + this.notificacion_id + '/imagen']);
            }
        });
    }

    store() {
        const formData = new FormData();
        const fileBrowser = this.imagen.nativeElement;
        console.log(fileBrowser);
        if (fileBrowser.files[0]) {
            formData.append('imagen', fileBrowser.files[0]);
            formData.append('notificacion_id', this.imagenNotificacionGroup.value.notificacion_id);
            formData.append('descripcion', this.imagenNotificacionGroup.value.descripcion);
            console.log(formData);
            this.imagenNotificacionService.store(formData).subscribe(res => {
                console.log(res);
                this.openDialog(res);
                this.imagenNotificacionGroup.reset();
            });

        }
    }
}
