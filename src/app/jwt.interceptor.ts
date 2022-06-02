import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './_services/authentication.service';

// intercepts outcoming http requests and injects authorization token to them
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;
		if (currentUser && currentUser[0].token) {
			request = request.clone({
				setHeaders: { 
					Authorization: `Bearer ${currentUser[0].token}`
				}
			});
		}
		return next.handle(request);
  }
}