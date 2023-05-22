import "./App.css";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { BooksList } from "./components/BooksList";
import { NewBookForm } from "./components/NewBookForm";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="hero is-fullheight">
      <nav className="navbar px-3">
        <div className="navbar-brand">
          <a
            className="navbar-item"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://www.bitorchestra.com/wp-content/uploads/2015/05/BitOrchestra-RE-EDIT-LOGO-2009-e1430915061114.jpg"
              alt="BitOrchestra-test-task"
              width="222"
              height="28"
            />
          </a>
        </div>
      </nav>

      <main className="section main">
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/add" element={<NewBookForm />} />
          <Route path="*" element={<p>Page not found</p>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="has-text-centered has-background-light is-flex-align-items-flex-end mt-auto p-3">
        <a href="https://github.com/Malva37/books-management" target="_blank" rel="noreferrer">
          My GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;
