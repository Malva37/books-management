/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo, useState } from "react";
import classNames from "classnames";
import "./BooksList.css";
import { Link } from "react-router-dom";
import { SortType } from "../../types/SortType";
import { filterBooks } from "../../utils/filterBooks";
import { BookContext } from "../../BookProvider";

export const BooksList: React.FC = () => {
  const { books, handleSelectBook, handleDeleteBook, handleStatusBook } =
    useContext(BookContext);
  const [sortType, setSortType] = useState<SortType>(SortType.ACTIVE);
  let visibleBooks = filterBooks(books, sortType);

  const totalNumberOfBooks = useMemo(() => {
    return books.length;
  }, [books, handleDeleteBook]);

  const filteredNumberOfBooks = useMemo(() => {
    if (sortType === SortType.ALL) {
      return 0;
    }
    return visibleBooks.length;
  }, [books, handleDeleteBook, handleStatusBook, sortType]);

  return (
    <>
      <nav
        className="navbar navbarFlex"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-item">
          <div className="control is-expanded">
            <div className="select">
              <select
                value={sortType}
                onChange={({ target }) => {
                  setSortType(target.value as SortType);
                }}
              >
                <option value={SortType.ACTIVE}>Show {SortType.ACTIVE}</option>
                <option value={SortType.ALL}>Show {SortType.ALL}</option>
                <option value={SortType.DEACTIVE}>
                  Show {SortType.DEACTIVE}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="navbar-item onDesktop">
          <ul>
            <li>Total number of books: {totalNumberOfBooks}</li>
            <li>Filtered number of books: {filteredNumberOfBooks}</li>
          </ul>
        </div>

        <div className="navbar-item">
          <p className="control">
            <Link to="add" className="is-align-items-stretch button is-ghost">
              Add new book
            </Link>
          </p>
        </div>
      </nav>

      <div className="table-container">
        <table className="table is-fullwidth is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th className="columnStyle">Title</th>
              <th className="columnStyle">Author</th>
              <th className="columnStyle">Category</th>
              <th className="columnStyle">Created At</th>
              <th className="columnStyle">Edited At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleBooks.map((book) => (
              <tr
                key={book.id}
                className={classNames({
                  "has-background-light": !book.activated,
                })}
                onDoubleClick={() => {
                  handleSelectBook(book);
                }}
              >
                <td className="columnStyle">{book.title}</td>
                <td className="columnStyle">{book.author}</td>
                <td>{book.category}</td>
                <td className="columnStyle">{book.createdAt}</td>
                <td className="columnStyle">
                  {!book.editedAt ? "--" : book.editedAt}
                </td>
                <td className="has-text-right is-vcentered">
                  <p className="buttons">
                    <button
                      className="button"
                      onClick={() => {
                        handleSelectBook(book);
                      }}
                    >
                      <span className="icon">
                        <Link to="add">
                          <i className="fas fa-edit"></i>
                        </Link>
                      </span>
                    </button>

                    {book.activated ? (
                      <button
                        className="button"
                        title="De-activate"
                        onClick={() => {
                          handleStatusBook(book, false);
                        }}
                      >
                        <span className="icon">
                          <i className="fa-solid fa-toggle-on"></i>
                        </span>
                      </button>
                    ) : (
                      <button
                        className="button"
                        title="Activate"
                        onClick={() => {
                          handleStatusBook(book, true);
                        }}
                      >
                        <span className="icon">
                          <i className="fa-solid fa-toggle-off"></i>
                        </span>
                      </button>
                    )}

                    {book.activated || (
                      <button
                        className="button"
                        onClick={() => {
                          handleDeleteBook(book.id);
                        }}
                      >
                        <span className="icon">
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </button>
                    )}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
