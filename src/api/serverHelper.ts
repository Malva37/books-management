import { Book } from "../types/Book";
import { client } from "../utils/fetchClient";

export const getBooks = async () => {
  const response = await client.get<Book[]>("/books");

  return response;
};

export const deleteBook = async (bookId: number) => {
  const response = await client.delete(`/books/${bookId}`);

  return response;
};

export const addBook = async (book: Book) => {
  const response = await client.post<Book>("/books", book);

  return response;
};

export const updateBook = (bookId: number, book: Book) => {
  return client.patch<Book>(`/books/${bookId}`, book);
};
