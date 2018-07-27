import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ActivatedRoute, Router} from '@angular/router';
@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .do((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    console.log('processing response ', ev);
                }
            })
            .catch( response => {
                if (response instanceof HttpErrorResponse ) {
                    if (response.error.autenticado === false) {
                    } else {
                        /*
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        alert('Cerrando sesión, por favor vuelva a autenticarse');
                        location.reload();
                        console.log('Processing http error ', response);
                        */
                    }
                }
                return Observable.throw(response);
            });
    }
}


