export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: number;
  createdAt: string;
  editedAt: string | null;
  activated: boolean,
}
