import type { Document } from '@prisma/client';

export const sortByTitleAToZ = (a: Document, b: Document) => a.title.localeCompare(b.title);
export const sortByTitleZToA = (a: Document, b: Document) => b.title.localeCompare(a.title);
