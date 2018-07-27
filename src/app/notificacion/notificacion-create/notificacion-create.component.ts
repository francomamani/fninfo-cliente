import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificacionService} from '../notificacion.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {CategoriaService} from '../../categoria/categoria.service';
import {UbicacionService} from '../../ubicacion/ubicacion.service';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-notificacion-create',
  templateUrl: './notificacion-create.component.html',
  styleUrls: ['./notificacion-create.component.css']
})
export class NotificacionCreateComponent implements OnInit {
    @ViewChild('imagen') imagen;
    categorias: any = [];
    ubicaciones: any = [];
    user: any = null;
    notificacionGroup: FormGroup;

    constructor(private notificacionService: NotificacionService,
                private categoriaService: CategoriaService,
                private ubicacionService: UbicacionService,
                private authService: AuthService,
                private dialog: MatDialog,
                private router: Router,
                private fb: FormBuilder) {

        this.categoriaService.index().subscribe(res => {
            this.categorias = res;
        });
        this.ubicacionService.index().subscribe(res => {
            this.ubicaciones = res;
        });
        this.user = this.authService.me();

    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.notificacionGroup = this.fb.group({
            'categoria_id': new FormControl(0, Validators.required),
            'ubicacion_id': new FormControl(0, Validators.required),
            'titulo': new FormControl('', Validators.required),
            'contenido': new FormControl('', Validators.required),
            'imagen': new FormControl('', Validators.required),
            'fecha_inicio': new FormControl(0),
            'fecha_fin': new FormControl(0),
            'web': new FormControl(''),
            'prioridad': new FormControl(0, Validators.required)
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '400px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de notificaciones?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if ( response === true) {
                this.router.navigate(['/notificacion/listar']);
            }
        });
    }

    store() {
        const formData = new FormData();
        const fileBrowser = this.imagen.nativeElement;
        console.log(fileBrowser);
        if (fileBrowser.files[0]) {
            formData.append('imagen', fileBrowser.files[0]);
            formData.append('user_id', this.user.id);
            formData.append('categoria_id', this.notificacionGroup.value.categoria_id);
            formData.append('ubicacion_id', this.notificacionGroup.value.ubicacion_id);
            formData.append('titulo', this.notificacionGroup.value.titulo);
            formData.append('contenido', this.notificacionGroup.value.contenido);
            formData.append('fecha_inicio', this.notificacionGroup.value.fecha_inicio.getTime());
            formData.append('fecha_fin', this.notificacionGroup.value.fecha_fin.getTime());
            formData.append('web', this.notificacionGroup.value.web);
            formData.append('prioridad', this.notificacionGroup.value.prioridad);
            console.log(formData);
            this.notificacionService.store(formData).subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
            this.notificacionGroup.reset();
        }
    }
}
