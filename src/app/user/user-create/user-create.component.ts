import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  hide = true;
  userGroup: FormGroup;
  constructor(
              private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
      this.userGroup = this.fb.group({
          'nombres': new FormControl('', Validators.required),
          'apellidos': new FormControl('', Validators.required),
          'carnet': new FormControl('', Validators.required),
          'cuenta': new FormControl('', Validators.required),
          'password': new FormControl('', [
              Validators.required,
              Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
          ])
      });
  }

  openDialog(res) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width: '500px',
          data: {
              info: res.mensaje + ' ¿Desea ir al listado de usuarios?',
              has_action: true
          }
      });

      dialogRef.afterClosed().subscribe(response => {
          if (response === true) {
              this.router.navigate(['/usuario/listar']);
          }
      });
  }

  store() {
    this.userService.store(this.userGroup.value).subscribe(res => {
        this.openDialog(res);
        this.userGroup.reset();
    }, (error : any) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    });
  }
}
