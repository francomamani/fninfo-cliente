import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SliderService} from '../slider.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-slider-create',
  templateUrl: './slider-create.component.html',
  styleUrls: ['./slider-create.component.css']
})
export class SliderCreateComponent implements OnInit {

  @ViewChild('imagen') imagen;
  sliderGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private router: Router,
              private sliderService: SliderService) {
  }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
      this.sliderGroup = this.fb.group({
          descripcion: new FormControl('', [Validators.required]),
          imagen: new FormControl('', [Validators.required])
      });
  }

  openDialog(res) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width: '400px',
          data: {
              info: res.mensaje + ' ¿Desea ir al listado de sliders?',
              has_action: true
          }
      });

    dialogRef.afterClosed().subscribe(response => {
        if ( response === true) {
            this.router.navigate(['/slider/listar']);
        }
    });
  }

  store() {
      const formData = new FormData();
      const fileBrowser = this.imagen.nativeElement;
      console.log(fileBrowser);
      if (fileBrowser.files[0]) {
          formData.append('imagen', fileBrowser.files[0]);
          formData.append('descripcion', this.sliderGroup.value.descripcion);
          console.log(formData);
          this.sliderService.store(formData).subscribe(res => {
              console.log(res);
              this.openDialog(res);
          });
          this.sliderGroup.reset();
      }
  }
}
