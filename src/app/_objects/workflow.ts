export class Workflow {
  _rid: number;
	name: string;
	
	static getWorkflowFromID(workflows: Workflow[], workflowID: number): Workflow {
		var i;
		for (i = 0; i < workflows.length; i++) {
			if (workflowID == workflows[i]._rid)
				return workflows[i];
		}
	}
}