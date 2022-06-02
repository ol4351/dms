import { Column } from './column';
import { Info } from './info';

export interface Document {
  _rid: number;
	comment: string;
  dateCreated: string;
  description: string;
	isProcessed: boolean;
	ridDmsActivity: number;
	ridDmsDocumentType: number;
	ridComUserCreated: number;
}

export interface DocumentData {
	info: Info;
	documents: Document[];
	count: number;
	columns: Column[];
}