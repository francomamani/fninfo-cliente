import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UbicacionService} from '../ubicacion.service';
import * as ol from 'openlayers/dist/ol';

@Component({
  selector: 'app-ubicacion-map',
  templateUrl: './ubicacion-map.component.html',
  styleUrls: ['./ubicacion-map.component.css']
})

export class UbicacionMapComponent implements OnInit {
    ubicacion: any = {
        nombre: '',
        descripcion: '',
        lat: 0,
        lng: 0,
        planta: 0
    };
  map: any;
  markerSource: any;
  zoom = 18;
  constructor(private route: ActivatedRoute, private ubicacionService: UbicacionService) {
    this.route.params.subscribe( params => {
      ubicacionService.show(params.id).subscribe((res: any) => {
        this.ubicacion = res;
        this.ubicacion.lat = parseFloat(res.lat);
        this.ubicacion.lng = parseFloat(res.lng);
        this.ubicacion.planta = parseFloat(res.planta);
        this.loadMap();
      });
    });

  }
  ngOnInit() {
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
      this.addMarker(this.ubicacion.lng, this.ubicacion.lat);
  }
  addMarker(lng, lat) {
      const iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
          title: 'example',
          name: 'Nueva ubicacion',
      });
      this.markerSource.clear();
      this.markerSource.addFeature(iconFeature);
      const popup = new ol.Overlay({
          position: ol.proj.fromLonLat([this.ubicacion.lng, this.ubicacion.lat]),
          element: document.getElementById('popup')
      });
      this.map.addOverlay(popup);
  }
}
