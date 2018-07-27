import {Component, OnInit, ViewChild} from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SliderService} from '../slider.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
@Component({
  selector: 'app-slider-index',
  templateUrl: './slider-index.component.html',
  styleUrls: ['./slider-index.component.css']
})
export class SliderIndexComponent implements OnInit {
    list: any = [];
    environment = environment;
    sliders: MatTableDataSource<any>;
    displayedColumns = ['descripcion', 'imagen', 'acciones'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private sliderService: SliderService,
        private dialog: MatDialog
    ) {
        this.sliderService.index().subscribe(res => {
            this.list = res;
            this.sliders = new MatTableDataSource(this.list);
            this.sliders.sort = this.sort;
            this.sliders.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.sliders.filter = filterValue;
    }

    ngOnInit() {
    }

    openDialog(id, index) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width : '450px',
            data : {
                info : '¿Esta seguro de eliminar la imagen del slider?',
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
        this.sliderService.destroy(id).subscribe(res => {
            this.list.splice(index, 1);
            this.sliders.data = this.list;
            this.sliders.sort = this.sort;
            this.sliders.paginator = this.paginator;
            console.log(res);
        });
    }
}
