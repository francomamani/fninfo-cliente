import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../environments/environment.prod';
@Injectable()
export class ImagenService {

    headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
    constructor(private http: HttpClient) {}

    index() {
        return this.http.get( environment.base + 'imagenes');
    }

    show(id) {
        return this.http.get(environment.base + 'imagenes/' + id);
    }

    store(formData) {
        return this.http.request('post', environment.base + 'imagenes', {
            body: formData,
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        });
    }

    update(form, id) {
        return this.http.put( environment.base + 'imagenes/' + id, form, { headers : this.headers });
    }
    destroy(id) {
        return this.http.delete( environment.base + 'imagenes/' + id , {
            headers: this.headers
        });
    }

}
