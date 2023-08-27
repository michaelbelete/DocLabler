export type Document = {
	id: number;
	title: string;
	body: string;
	url: string;
};

export type DocumentsView = 'grid' | 'list';
export type DocumentsSort = 'asc' | 'desc';

export type GetLabelInput = {
	documentId: number;
	visitorId: string;
};

export type LabelInput = {
	label: string;
	visitorId: string;
	documentId: number;
};

export type Response<T> = {
	data?: T;
	message: string;
};
