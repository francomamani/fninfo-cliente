import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {SliderService} from '../slider.service';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrls: ['./slider-edit.component.css']
})
export class SliderEditComponent implements OnInit {
    sliderGroup: FormGroup;
    slider: any = null;
    constructor(
        private sliderService: SliderService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            sliderService.show(res.id).subscribe( slider => {
                this.slider = slider;
                this.createForm(slider);
            });
        });
    }

    ngOnInit() {
    }

    createForm(slider) {
        this.sliderGroup= this.fb.group({
            'id': new FormControl(slider.id, Validators.required),
            'descripcion': new FormControl(slider.descripcion, Validators.required),
            'imagen': new FormControl(slider.imagen, Validators.required)
        });
    }
    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '350px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de sliders?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if(response === true) {
                this.router.navigate(['/slider/listar']);
            }
        });
    }

    update() {
        this.sliderService
            .update(this.sliderGroup.value, this.sliderGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}