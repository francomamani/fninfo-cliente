import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from '../../environments/environment.prod';
@Injectable()
export class SliderService {

    constructor(private http: HttpClient) {}

    index() {
        return this.http.get( environment.base + 'sliders');
    }

    show(id) {
        return this.http.get(environment.base + 'sliders/' + id);
    }

    store(formData) {
        return this.http.request('post', environment.base + 'sliders', {
            body: formData,
            headers: new HttpHeaders('Authorization')
        });
    }

    update(form, id) {
        return this.http.put( environment.base + 'sliders/' + id, form);
    }
    destroy(id) {
        return this.http.delete( environment.base + 'sliders/'+id);
    }
    getImagen(id) {
        return this.http.get(environment.base + 'get-slider-imagen/' + id);
    }
}
