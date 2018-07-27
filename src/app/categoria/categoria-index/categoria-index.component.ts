import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { environment} from '../../../environments/environment.prod';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {CategoriaService} from '../categoria.service';
@Component({
  selector: 'app-categoria-index',
  templateUrl: './categoria-index.component.html',
  styleUrls: ['./categoria-index.component.css']
})
export class CategoriaIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    categorias: MatTableDataSource<any>;
    displayedColumns = ['nombre', 'descripcion', 'icono', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private categoriaService: CategoriaService,
        private dialog: MatDialog) {
        this.categoriaService.index().subscribe(res => {
            this.list = res;
            this.categorias = new MatTableDataSource(this.list);
            this.categorias.sort = this.sort;
            this.categorias.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.categorias.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar la categoria?',
                has_action: true
            }
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res === true) {
                this.destroy(id, index);
            }
        });
    }

    destroy(id, index) {
        this.categoriaService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.categorias.data = this.list;
            this.categorias.sort = this.sort;
            this.categorias.paginator = this.paginator;
            console.log(res);
        });
    }
}