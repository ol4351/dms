export interface BudgetType {
	ridComCountry: number;
	code: string;
	name: string;
	comment: string;
}

export interface Budget {
	_rid: number;
	comment: string;
	ridDmsActivity: number;
	ridDmsBudgetType: number;
	ridDmsDocument: number;
	ridDmsPerson: number;
	ridDmsOrganization: number;
	value; number;
}