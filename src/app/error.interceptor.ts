import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';

// intercepts incoming http requests and if they contain error, it's handled accordingly e.g.
// if error 401 is present, user is logged out and and error message is showed 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService, private alertService: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				this.authenticationService.logout();
				err.statusText = "User is not authenticated.";
				location.reload(true);
			}
			if (err.status === 403) {
				err.statusText = "Incorrect login and/or password.";
			}
			const error = err.error.message || err.statusText;
			return throwError(error);
		}));
  }
}
