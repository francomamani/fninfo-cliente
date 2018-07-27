import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    userGroup: FormGroup;
    user: any = null;
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            userService.show(res.id).subscribe( user => {
                this.user = user;
                this.createForm(user);
            });
        });
    }

    ngOnInit() {
    }

    createForm(user) {
        this.userGroup = this.fb.group({
            'id': new FormControl(user.id, Validators.required),
            'nombres': new FormControl(user.nombres, Validators.required),
            'apellidos': new FormControl(user.apellidos, Validators.required),
            'cuenta': new FormControl(user.cuenta, Validators.required),
            'carnet': new FormControl(user.carnet, Validators.required)
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data: {
                info: res.mensaje + ' ¿Desea volver al listado de usuarios?',
                has_action: true
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/usuario/listar']);
            }
        });

    }

    update() {
        this.userService
            .update(this.userGroup.value, this.userGroup.value.id)
            .subscribe(res => {
                console.log(res);
                this.openDialog(res);
            });
    }
}
