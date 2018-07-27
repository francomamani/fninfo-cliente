import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-mensaje-dialog',
  templateUrl: './mensaje-dialog.component.html',
  styleUrls: ['./mensaje-dialog.component.css']
})
export class MensajeDialogComponent implements OnInit {

  mensaje: any = null;
  has_action = false;
  constructor(public dialogRef: MatDialogRef<MensajeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mensaje = data;
    if(this.mensaje.has_action === true) {
      this.has_action = true;
    }
    console.log(data);
  }

  ngOnInit() {
  }
  cancel(){
    this.dialogRef.close();
  }
  close() {
    if (this.mensaje.has_action === true){
        this.dialogRef.close(true);
    } else {
        this.dialogRef.close(false);
    }
  }

}
