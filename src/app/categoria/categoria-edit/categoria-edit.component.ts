import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaService} from '../categoria.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {
    categoriaGroup: FormGroup;
    categoria: any = null;
    color: any = '';
    constructor(
        private categoriaService: CategoriaService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            categoriaService.show(res.id).subscribe( categoria => {
                this.categoria = categoria;
                this.createForm(categoria);
            });
        });
    }

    ngOnInit() {
    }

    createForm(categoria) {
        console.log(this.categoria);
        this.color = this.categoria.color;
        this.categoriaGroup = this.fb.group({
            'id': new FormControl(categoria.id, Validators.required),
            'nombre': new FormControl(categoria.nombre, Validators.required),
            'descripcion': new FormControl(categoria.descripcion, Validators.required),
            'icono': new FormControl(categoria.icono, Validators.required),
            'color': new FormControl(categoria.color, Validators.required)
        });
    }
    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de categorias?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if(response === true) {
                this.router.navigate(['/categoria/listar']);
            }
        });

    }

    update() {
        this.categoriaGroup.patchValue({ color: this.color});
        this.categoriaService
            .update(this.categoriaGroup.value, this.categoriaGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
