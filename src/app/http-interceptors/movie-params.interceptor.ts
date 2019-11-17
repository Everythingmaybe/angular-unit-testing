import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class MovieParamsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes(environment.apiUrl) || req.url.includes(environment.postersApiUrl)) {
      const paramReq = req.clone({
        params: req.params.set(
          'apikey',
          environment.apiKey,
        )
      });
      return next.handle(paramReq);
    } else {
      return next.handle(req);
    }

  }
}
