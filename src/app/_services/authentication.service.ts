import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, UserData } from '../_objects/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private currentUserSubject: BehaviorSubject<UserData>;
	public currentUser: Observable<UserData>;

  constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<UserData>(JSON.parse(localStorage.getItem('currentUser'))); // change for less persistence
		this.currentUser = this.currentUserSubject.asObservable();
	}
	
	// value can be used when you just want to get the current value of the logged in user but don't need to reactively update when it changes
	public get currentUserValue(): UserData {
		return this.currentUserSubject.value;
	}
	
	login(username: string, password: string, language: string) {
		const url = "http://192.168.2.55/gate.page?req=login&type=token";
		return this.http.post<any>(url, { username, password, language })
			.pipe(map(userData => {
				console.log(userData);
				if (userData[0].http == 200) {
					console.log("Login successful");
				}
				// login successful if there's a jwt token in the response
				if (userData && userData[0].token) {
					// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem('currentUser', JSON.stringify(userData));
					this.currentUserSubject.next(userData);
				}
				return userData;
			}))
	} 
	
	logout() {
		const url = "http://192.168.2.55/gate.page?req=logout"
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
		this.http.post<any>(url, {});
	}
}
