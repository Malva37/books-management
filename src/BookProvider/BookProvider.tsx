/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { Book } from "../types/Book";
// import { BookRequest } from "../types/BookCredentials";
import { BookRequest } from "../types/BookRequest";
import { addBook, deleteBook, getBooks, updateBook } from "../api/serverHelper";
import moment from "moment";
import "moment-timezone";

type ContextType = {
  books: Book[];
  selectedBook: Book | null;
  handleSelectBook: (book: Book | null) => void;
  handleFormSubmit: (book: BookRequest) => void;
  handleDeleteBook: (bookId: number) => void;
  handleStatusBook: (book: Book, activated: boolean) => void;
  handleUpdateBook: (book: Book, updatedBook: BookRequest) => void;
};

export const BookContext = React.createContext<ContextType>({
  books: [],
  selectedBook: null,
  handleSelectBook: () => {},
  handleFormSubmit: () => {},
  handleDeleteBook: () => {},
  handleStatusBook: () => {},
  handleUpdateBook: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const BookProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const timezone = moment.tz.guess();

  const getBooksFromServer = async () => {
    try {
      const booksFromServer = await getBooks();
      setBooks(booksFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooksFromServer();
  }, []);

  const handleSelectBook = (value: Book | null) => {
    setSelectedBook(value);
  };

  const handleFormSubmit = async (data: BookRequest) => {
    const date = moment().tz(timezone);
    const newBook: Book = {
      id: 0,
      title: data.title,
      author: data.author,
      category: data.category,
      isbn: data.isbn,
      createdAt: date.format("D MMMM YYYY, h:mmA"),
      editedAt: null,
      activated: true,
    };

    try {
      await addBook(newBook);
      setSelectedBook(null);
      await getBooksFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      setSelectedBook(null);
      await getBooksFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBook = async (book: Book, updatedData: BookRequest) => {
    const date = moment().tz(timezone);
    const updatedBook: Book = {
      ...book,
      title: updatedData.title,
      author: updatedData.author,
      category: updatedData.category,
      isbn: updatedData.isbn,
      editedAt: date.format("D MMMM YYYY, h:mmA"),
    };

    try {
      await updateBook(book.id, updatedBook);
      setSelectedBook(null);
      await getBooksFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusBook = async (book: Book, activated: boolean) => {
    const updatedBook: Book = { ...book, activated };

    try {
      await updateBook(book.id, updatedBook);
      setSelectedBook(null);
      await getBooksFromServer();
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = useMemo(() => {
    return {
      books,
      selectedBook,
      handleSelectBook,
      handleFormSubmit,
      handleDeleteBook,
      handleUpdateBook,
      handleStatusBook,
    };
  }, [books, selectedBook]);

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};
