import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../environments/environment.prod';
@Injectable()
export class CategoriaUbicacionService {

    headers: any = null;
    constructor(private http: HttpClient) {
        this.headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
        };
    }

    index() {
        return this.http.get( environment.base + 'categoria-ubicaciones');
    }

    show(id) {
        return this.http.get(environment.base + 'categoria-ubicaciones/' + id, { headers: this.headers });
    }

    store(formData) {
        return this.http.request('post', environment.base + 'categoria-ubicaciones', {
            body: formData,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    update(form, id) {
        return this.http.put( environment.base + 'categoria-ubicaciones/' + id, form, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete( environment.base + 'categoria-ubicaciones/' + id, { headers: this.headers });
    }
    getIcono(id) {
        return this.http.get(environment.base + 'get-categoria-ubicacion-icono/' + id);
    }
    hasManyUbicaciones(id){
        return this.http.get(environment.base + 'categoria-ubicacion-has-many-ubicaciones/' + id, { headers: this.headers })
    }
}
