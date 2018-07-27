import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../environments/environment.prod';
@Injectable()
export class ImagenNotificacionService {
    headers: any = null;
    constructor(private http: HttpClient) {
        this.headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
    }

    index() {
        return this.http.get( environment.base + 'imagen-notificaciones');
    }

    show(id) {
        return this.http.get(environment.base + 'imagen-notificaciones/' + id);
    }

    store(formData) {
        return this.http.request('post', environment.base + 'imagen-notificaciones', {
            body: formData,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    update(form, id) {
        return this.http.put( environment.base + 'imagen-notificaciones/' + id, form, {
            headers : this.headers
        });
    }
    destroy(id) {
        return this.http.delete( environment.base + 'imagen-notificaciones/' + id, { headers : this.headers });
    }
}
