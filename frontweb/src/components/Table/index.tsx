import "./styles.css";

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

import { BookDTO } from "../../models/book";
import * as bookService from "../../services/book-service";
import FormBookModal from "../FormBookModal";
import ViewBookModal from "../ViewBookModal";

export default function Table() {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    bookService.findAll().then((response) => {
      setBooks(response.data.content);
    });
  }, []);

  const handleViewBook = (book: BookDTO) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedBook(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleBookAdded = (newBook: BookDTO) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className="table-container">
      <div className="button-container">
        <button type="button" className="add-button" onClick={openAddModal}>
          Add book
        </button>
      </div>
      {books.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Synopsis</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.sinopse}</td>
                <td>
                  <button
                    onClick={() => handleViewBook(book)}
                    className="view-button"
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum livro cadastrado</p>
      )}

      {selectedBook && (
        <ViewBookModal
          book={selectedBook}
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
        />
      )}

      {isAddModalOpen && (
        <FormBookModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          onBookAdded={handleBookAdded}
        />
      )}
    </div>
  );
}
