import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  passwordGroup: FormGroup;
  hide  = true;
  hide1  = true;
  hide2  = true;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.passwordGroup = this.fb.group({
        'current_password' : new FormControl('', Validators.required),
        'new_password' : new FormControl('', [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        ]),
        'new_password_repeated' : new FormControl('', [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
        ]),
    });
  }
  openDialog(res) {
      const dialogRef = this.dialog.open(MensajeDialogComponent, {
          width: '500px',
          data: {
              info: res.mensaje + ' ¿Desea ir a su perfil ?',
              has_action: true
          }
      });

      dialogRef.afterClosed().subscribe(response => {
          if (response === true) {
              this.router.navigate(['/usuario/perfil']);
          }
      });
  }
  changePassword() {
      this.authService.changePassword(this.passwordGroup.value, this.authService.me().id)
          .subscribe(res => {
            this.openDialog(res);
          });
  }

}
