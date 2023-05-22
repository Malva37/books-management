/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { BookContext } from "../../BookProvider";
import { BookRequest } from "../../types/BookRequest";
import { CategoryType } from "../../types/CategoryType";
import { Modal } from "../Modal";
import { NumberField } from "../NumberField";
import { TextField } from "../TextField";

export const NewBookForm: React.FC = () => {
  const { selectedBook, handleFormSubmit, handleUpdateBook, handleSelectBook } =
    useContext(BookContext);
  const [categoryType, setCategoryType] = useState<CategoryType>(
    CategoryType.HORROR
  );

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const openModal = (message: string) => {
    setSuccessMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/");
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showModal]);

  const handleShowModal = (infoMessage: string) => {
    openModal(infoMessage);
    setShowModal(true);
  };

  useEffect(() => {
    if (selectedBook) {
      fillForm();
    }
  }, [selectedBook]);

  const fillForm = () => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setCategoryType(selectedBook.category as CategoryType);
      setIsbn(selectedBook.isbn.toString());
    }
  };

  const isValidISBN = /^[0-9]{10,13}$/.test(isbn);
  const isFormNotValid = title === "" || author === "" || !isValidISBN;

  let disabled = true;

  if (isFormNotValid) {
    disabled = true;
  } else {
    disabled = false;
  }

  const createBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormNotValid) {
      return;
    }

    if (selectedBook) {
      const updatedBook: BookRequest = {
        title,
        author,
        category: categoryType,
        isbn: +isbn,
      };

      handleUpdateBook(selectedBook, updatedBook);
      handleShowModal("You have edited book, let's go to book list.");
      return;
    }

    const newBook: BookRequest = {
      title,
      author,
      category: categoryType,
      isbn: +isbn,
    };

    handleFormSubmit(newBook);
    handleShowModal("You have added one new book, let's go to book list.");
  };

  return (
    <>
      <div className="is-flex is-justify-content-space-between">
        {!selectedBook ? (
          <h4 className="title">Add a book</h4>
        ) : (
          <h4 className="title">Edit book</h4>
        )}
        <p className="control">
          <Link
            to="/"
            className="is-align-items-stretch button is-ghost"
            onClick={() => {
              handleSelectBook(null);
            }}
          >
            Go to book list
          </Link>
        </p>
      </div>

      <form className="NewMovie" onSubmit={createBook}>
        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={setTitle}
          required
        />

        <TextField
          name="author"
          label="Author"
          value={author}
          onChange={setAuthor}
          required
        />

        <div className="field">
          <label className="label" htmlFor="category">
            Category
          </label>

          <div className="select is-fullwidth control">
            <select
              id="category"
              value={categoryType}
              onChange={({ target }) => {
                setCategoryType(target.value as CategoryType);
              }}
            >
              <option value={CategoryType.HORROR}>{CategoryType.HORROR}</option>
              <option value={CategoryType.CLASSIC}>
                {CategoryType.CLASSIC}
              </option>
              <option value={CategoryType.CRIME}>{CategoryType.CRIME}</option>
              <option value={CategoryType.FANTASY}>
                {CategoryType.FANTASY}
              </option>
            </select>
          </div>
        </div>

        <NumberField
          name="isbn"
          label="International Standard Book Number (ISBN)"
          value={isbn}
          onChange={setIsbn}
          pattern="^[0-9]{10,13}$"
          required
        />

        <div className="field is-grouped">
          <div className="control">
            {selectedBook ? (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled={disabled}
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled={disabled}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </form>

      {showModal &&
        ReactDOM.createPortal(
          <Modal message={successMessage} />,
          document.getElementById("modal-root") as Element
        )}
    </>
  );
};
