import { Info } from './info';

export interface Organization {
	_rid: number;
	id: number;
	name: string;
	shortName: string;
	department: string;
	street: string;
	streetNum1: number;
	streetNum2: string;
	zip: number;
	city: string;
	taxID: number;
	vatID: number;
}

export interface OrganizationData {
	info: Info;
	Organization: Organization[];
}