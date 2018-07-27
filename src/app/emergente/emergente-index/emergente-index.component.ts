import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material';
import {EmergenteService} from '../emergente.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-emergente-index',
  templateUrl: './emergente-index.component.html',
  styleUrls: ['./emergente-index.component.css']
})
export class EmergenteIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    emergentes: MatTableDataSource<any>;
    displayedColumns = ['titulo', 'descripcion', 'imagen', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private emergenteService: EmergenteService,
        private dialog: MatDialog) {
        this.emergenteService.index().subscribe(res => {
            this.list = res;
            this.emergentes = new MatTableDataSource(this.list);
            this.emergentes.sort = this.sort;
            this.emergentes.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.emergentes.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(req, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar "' + req.titulo.toLowerCase() + '"?',
                has_action: true
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res === true) {
                this.destroy(req.id, index);
            }
        });
    }
    sendDialog(req) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '450px',
            data : {
                info: '¿Esta seguro de re enviar "' + req.titulo.toLowerCase() + '"?',
                has_action: true
            }
        });
        dialogRef.afterClosed().subscribe( res => {
            const requestResend = {
              'creado' : req
            };
            if (res === true) {
                this.send(requestResend);
            }
        });
    }

    destroy(id, index) {
        this.emergenteService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.emergentes.data = this.list;
            this.emergentes.sort = this.sort;
            this.emergentes.paginator = this.paginator;
            console.log(res);
        });
    }
    send(form) {
        console.log(form);
        this.emergenteService.send(form).subscribe(res => console.log(res));
    }
}
