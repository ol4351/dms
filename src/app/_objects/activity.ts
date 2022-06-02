export class Activity {
  _rid: number;
	name: string;
	
	static getProjectFromID(activities: Activity[], activityId: number): Activity {
		var i;
		for (i = 0; i < activities.length; i++) {
			if (activityId == activities[i]._rid)
				return activities[i];
		}
	}
}