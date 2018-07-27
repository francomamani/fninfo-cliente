import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasoService} from '../paso.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {UbicacionService} from '../../ubicacion/ubicacion.service';

@Component({
  selector: 'app-paso-create',
  templateUrl: './paso-create.component.html',
  styleUrls: ['./paso-create.component.css']
})
export class PasoCreateComponent implements OnInit {

    @ViewChild('documento') documento;
    @ViewChild('imagen') imagen;
    pasoGroup: FormGroup;
    tramite_id: any = null;
    ubicaciones: any = null;
    constructor(private pasoService: PasoService,
                private dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute,
                private ubicacionService: UbicacionService,
                private fb: FormBuilder) {
      this.route.parent.params.subscribe(res => {
        this.tramite_id = res.id;
        this.createForm(res.id);
      });
      this.ubicacionService.index().subscribe(res => {
          this.ubicaciones = res;
      });
    }

    ngOnInit() {

    }

    createForm(tramite_id){
        this.pasoGroup = this.fb.group({
            'tramite_id': new FormControl(tramite_id),
            'titulo': new FormControl('', Validators.required),
            'descripcion': new FormControl('', Validators.required),
            'url': new FormControl(''),
            'ubicacion_id': new FormControl(0),
            'documento': new FormControl(''),
            'imagen': new FormControl(''),
            'posicion': new FormControl(0, Validators.required)
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '400px',
            data: {
                info: res.mensaje + ' ¿Desea ir al listado de pasos del tramite?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if ( response === true) {
                this.router.navigate(['/tramite/' + this.tramite_id + '/paso']);
            }
        });
    }

    store() {
        const formData = new FormData();
        const documentoBrowser = this.documento.nativeElement;
        const imagenBrowser = this.imagen.nativeElement;
        console.log(documentoBrowser);
        if (documentoBrowser.files[0]) {
            formData.append('documento', documentoBrowser.files[0]);
        } else {
            formData.append('documento', this.pasoGroup.value.documento);
        }
        if (imagenBrowser.files[0]) {
            formData.append('imagen', imagenBrowser.files[0]);
        } else {
            formData.append('imagen', this.pasoGroup.value.imagen);
        }
        formData.append('tramite_id', this.pasoGroup.value.tramite_id);
        formData.append('titulo', this.pasoGroup.value.titulo);
        formData.append('descripcion', this.pasoGroup.value.descripcion);
        formData.append('url', this.pasoGroup.value.url);
        formData.append('ubicacion_id', this.pasoGroup.value.ubicacion_id);
        formData.append('posicion', this.pasoGroup.value.posicion);
        console.log(formData);
        this.pasoService.store(formData).subscribe(res => {
            console.log(res);
            this.openDialog(res);
        });
        this.pasoGroup.reset();
        this.createForm(this.tramite_id);
    }
}
