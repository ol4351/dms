export class Status {
  _rid: number;
	name: string;
	
	static getStatusFromID(statuses: Status[], statusID: number): Status {
		var i;
		for (i = 0; i < statuses.length; i++) {
			if (statusID == statuses[i]._rid)
				return statuses[i];
		}
	}
}