export class Category {
  _rid: number;
  name: string;
	isChild: number;
	isSpending: number;
	isAllocation: number;

	static getCategoryFromID(categories: Category[], categoryID: number): Category {
		var i;
		for (i = 0; i < categories.length; i++) {
			if (categoryID == categories[i]._rid)
				return categories[i];
		}
	}
}