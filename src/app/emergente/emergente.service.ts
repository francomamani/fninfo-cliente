import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class EmergenteService {
    headers = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
    constructor(private http: HttpClient) {
    }
    index() {
        return this.http.get(environment.base + 'emergentes');
    }
    show(id) {
        return this.http.get( environment.base + 'emergentes/' + id);
    }
    store(data) {
        return this.http.request('post',  environment.base + 'emergentes', {
            body: data,
            headers : this.headers
        });
    }
    update(data, id) {
        return this.http.put(environment.base + 'emergentes/' + id, data, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete(environment.base + 'emergentes/' + id, { headers: this.headers });
    }
    send(form) {
        return this.http.request('post', 'https://fcm.googleapis.com/fcm/send', {
            body : {
                'to' : '/topics/fni',
                'data' : form.creado
            },
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'key=AAAAvXcv05s:APA91bG5usJV1yRza8lcjKK3SzE0JBDKeQ4FeVD8SL6Pz18jq_pp7xznEGSgfEQYxYmocmNzX10FDm4awbuZvy6DiCIheG7yW62203C_a_n7fhArWL5wrcjqfzMmzYzMgoAJ29q_-FrI',
            }
        });
    }
}