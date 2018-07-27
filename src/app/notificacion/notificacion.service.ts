import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class NotificacionService {
  headers: any = null;
  constructor(private http: HttpClient) {
      this.headers = {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      };
  }
  index() {
    return this.http.get(environment.base + 'notificaciones');
  }
  show(id) {
      return this.http.get(environment.base + 'notificaciones/' + id);
  }
  store(form) {
      return this.http.request('post', environment.base + 'notificaciones', {
          body: form,
          headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
      });
  }
  update(form, id) {
      return this.http.put(environment.base + 'notificaciones/' + id, form, {headers: this.headers});
  }
  destroy(id) {
      return this.http.delete(environment.base + 'notificaciones/' + id, {headers: this.headers});
  }

  getImagenNotificaciones(notificacion_id) {
      return this.http.get(environment.base + 'notificaciones/' + notificacion_id + '/get-imagen-notificaciones');
  }
}
