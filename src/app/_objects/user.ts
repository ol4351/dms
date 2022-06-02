import { Info } from './info';

export class User {
  _rid: number;
	login: string;
	password: string;
	nickName: string;
	firstName: string;
	lastName: string;
	email: string;
	isEnabled: boolean;
	isActive: boolean;
	
	static getUserFromID(users: User[], userID: number): User {
		var i;
		for (i = 0; i < users.length; i++) {
			if (userID == users[i]._rid)
				return users[i];
		}
	}
}

export interface Role {
	countryCode: string;
	countryName: string;
	role: string;
}

export interface Country {
	code: string;
	currency: string;
	exchangeRate: number;
	name: string;
	ridComLanguage: number;
	valueLimit: number;
	_rid: number;
}

export interface UserData {
  info: Info;
	user: User;
	access: [Country, Role];
}