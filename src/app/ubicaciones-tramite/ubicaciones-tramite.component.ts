import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {ActivatedRoute, Router} from '@angular/router';
import {UbicacionService} from '../ubicacion/ubicacion.service';
import {CategoriaUbicacionService} from '../categoria-ubicacion/categoria-ubicacion.service';
import * as ol from 'openlayers/dist/ol';
import {TramiteService} from '../tramite/tramite.service';

@Component({
  selector: 'app-ubicaciones-tramite',
  templateUrl: './ubicaciones-tramite.component.html',
  styleUrls: ['./ubicaciones-tramite.component.css']
})
export class UbicacionesTramiteComponent implements OnInit {
    ubicaciones: any = [];
    ubicacion = {
        lat: -17.988922,
        lng: -67.137222
    };
    map: any;
    markerSource: any;
    zoom = 19;
    tramite_id = 0;
    pasos: any = null;
    environment = environment;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private categoriaUbicacionService: CategoriaUbicacionService,
                private tramiteService: TramiteService,
                private ubicacionService: UbicacionService) {
    }

    ngOnInit() {
        this.route.params.subscribe( params => {
            if (params.tramite_id) {
                console.log(params.tramite_id);
                this.tramite_id = params.tramite_id;
                this.hasManyPasos(this.tramite_id);
            }
        });
    }
    hasManyPasos(tramite_id) {
        this.ubicaciones = [];
        this.tramiteService.hasManyPasos(tramite_id).subscribe((pasos: any) => {
            const pasos2 = pasos;
            pasos2.map(paso => {
                if (paso.ubicacion_id !== 0 ) {
                    this.ubicacionService.show(paso.ubicacion_id)
                        .subscribe(u => {
                            this.ubicaciones.push(u);
                        });
                }
            });
            console.log(this.ubicaciones);

            this.hasManyUbicaciones(this.ubicaciones);
        });

    }
    ngOnChanges() {
        this.route.params.subscribe( params => {
            if (params.tramite_id) {
                console.log(params.tramite_id);
                this.tramite_id = params.tramite_id;
                this.hasManyPasos(this.tramite_id);
            }
        });
    }
    hasManyUbicaciones(ubicaciones) {

        if (ubicaciones.length > 0) {
            this.ubicacion = ubicaciones[0];
        }
        this.createDOM(ubicaciones);
        this.loadMap();
        this.ubicaciones.map(ubicacion => {
            console.log(ubicacion);
            this.addMarker(ubicacion.lng, ubicacion.lat, ubicacion.id, ubicacion.nombre);
        });
    }

    createDOM(ubicaciones) {
        const map = document.getElementById('map');
        while (map.firstChild) {
            map.removeChild(map.firstChild);
        }
        ubicaciones.map(ubicacion => {
            const newElement = document.createElement('div');
            newElement.className = 'popup';
            newElement.id = ubicacion.id + '-' + ubicacion.nombre;
            newElement.innerHTML = ubicacion.nombre;
            map.appendChild(newElement);
        });
    }
    loadMap() {
        this.markerSource = new ol.source.Vector();
        const markerStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.47, 32],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'assets/marker32.png'
            }))
        });
        this.map = new ol.Map({
            target: 'map',
            layers : [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                new ol.layer.Vector({
                    source: this.markerSource,
                    style: markerStyle
                })
            ],
            view : new ol.View({
                center : ol.proj.fromLonLat([this.ubicacion.lng, this.ubicacion.lat]),
                zoom : this.zoom
            })
        });
        /*    this.addMarker(this.ubicacion.lng, this.ubicacion.lat, this.ubicacion.id, this.ubicacion.nombre);*/
    }
    addMarker(lng, lat, ubicacion_id, ubicacion_nombre) {
        const iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
            title: 'example',
            name: 'Nueva ubicacion',
        });
        /*this.markerSource.clear();*/
        this.markerSource.addFeature(iconFeature);

        const popup = new ol.Overlay({
            position: ol.proj.fromLonLat([lng, lat]),
            element: document.getElementById(ubicacion_id + '-' + ubicacion_nombre)
        });
        this.map.addOverlay(popup);
    }

}
