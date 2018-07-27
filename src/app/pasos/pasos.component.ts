import {Component, OnInit, ViewChild} from '@angular/core';
import {TramiteService} from '../tramite/tramite.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment.prod';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MensajeDialogComponent} from '../mensaje-dialog/mensaje-dialog.component';
import {PasoService} from '../paso/paso.service';

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {
    list: any = [];
    environment = environment;
    pasos: MatTableDataSource<any>;
    tramite: any = null;
    displayedColumns = ['titulo', 'descripcion', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private pasoService: PasoService,
        private route: ActivatedRoute,
        private tramiteService: TramiteService,
        private dialog: MatDialog
    ) {
        this.route.params.subscribe(params => {
            console.log(params);
            console.log('Estas en los pasos del tramite');
            this.hasManyPasos(params.id);
            this.tramiteService.show(params.id).subscribe(res => {
                this.tramite = res;
            });
        });
    }

    hasManyPasos(id) {
        this.tramiteService.hasManyPasos(id).subscribe(res => {
            this.list = res;
            this.pasos = new MatTableDataSource(this.list);
            this.pasos.sort = this.sort;
            this.pasos.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.pasos.filter = filterValue;
    }

    ngOnInit() {
    }

}
