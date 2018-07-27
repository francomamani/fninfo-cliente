import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagenService} from '../imagen.service';

@Component({
  selector: 'app-imagen-create',
  templateUrl: './imagen-create.component.html',
  styleUrls: ['./imagen-create.component.css']
})
export class ImagenCreateComponent implements OnInit {
    @ViewChild('imagen') imagen;
    imagenGroup: FormGroup;
    ubicacion_id: number = null;
    // api/ubicacion/{id}/imagen
    constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private imagenService: ImagenService) {
        this.route.parent.params.subscribe(res => {
            this.ubicacion_id = res.id;
            this.createForm(res.id);
        });
    }

    ngOnInit() {
    }
    createForm(ubicacion_id) {
        this.imagenGroup = this.fb.group({
            ubicacion_id: new FormControl(ubicacion_id),
            descripcion: new FormControl('', [Validators.required]),
            imagen: new FormControl('', [Validators.required])
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '400px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de imagenes?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if ( response === true) {
                this.router.navigate(['/ubicacion/' + this.ubicacion_id + '/imagen']);
            }
        });
    }

    store() {
        const formData = new FormData();
        const fileBrowser = this.imagen.nativeElement;
        console.log(fileBrowser);
        if (fileBrowser.files[0]) {
            formData.append('imagen', fileBrowser.files[0]);
            formData.append('ubicacion_id', this.imagenGroup.value.ubicacion_id);
            formData.append('descripcion', this.imagenGroup.value.descripcion);
            console.log(formData);
            this.imagenService.store(formData).subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
            this.imagenGroup.patchValue({
                descripcion: '',
                imagen: ''
            });
        }
    }
}