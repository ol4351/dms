import { Info } from './info';

export interface Person {
	_rid: number;
	prefix: string;
	firstName: string;
	lastName: string;
	suffix: string;
	birthDate: string;
	position: string;
	phone: string;
	email: string;
}

export interface PersonData {
	info: Info;
	people: Person[];
}