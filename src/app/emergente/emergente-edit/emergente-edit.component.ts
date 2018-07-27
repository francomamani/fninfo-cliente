import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {EmergenteService} from '../emergente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-emergente-edit',
  templateUrl: './emergente-edit.component.html',
  styleUrls: ['./emergente-edit.component.css']
})
export class EmergenteEditComponent implements OnInit {

  imagenes = [
      {
          'key': 'true',
          'value' : 'Con imagen'
      },
      {
          'key': 'false',
          'value' : 'Sin imagen'
      }
  ];
    emergenteGroup: FormGroup;
    emergente: any = null;
    constructor(
        private emergenteService: EmergenteService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            emergenteService.show(res.id).subscribe( emergente => {
                this.emergente = emergente;
                this.createForm(emergente);
            });
        });
    }

    ngOnInit() {
    }

    createForm(emergente) {
        console.log(this.emergente);
        this.emergenteGroup = this.fb.group({
            'id': new FormControl(emergente.id, Validators.required),
            'titulo': new FormControl(emergente.titulo, Validators.required),
            'descripcion': new FormControl(emergente.descripcion, Validators.required),
            'imagen': new FormControl(emergente.imagen, Validators.required)
        });
    }
    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de emergentes?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if(response === true) {
                this.router.navigate(['/emergente/listar']);
            }
        });

    }

    update() {
        this.emergenteService
            .update(this.emergenteGroup.value, this.emergenteGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
