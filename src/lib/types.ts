export type Document = {
	id: number;
	title: string;
	body: string;
	url: string;
};

export type DocumentsView = 'grid' | 'list';
export type DocumentsSort = 'asc' | 'desc';
