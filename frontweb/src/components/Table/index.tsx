import "./styles.css";
import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { BookDTO } from "../../models/book";
import * as bookService from "../../services/book-service";
import FormBookModal from "../FormBookModal";
import ViewBookModal from "../ViewBookModal";
import DeleteBookModal from "../DeleteBookModal";

export default function Table() {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    setSelectedBook(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (book: BookDTO) => {
    setSelectedBook(book);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedBook(null);
  };

  const openDeleteModal = (book: BookDTO) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBook(null);
  };

  const handleBookAdded = (newBook: BookDTO) => {
    setBooks([...books, newBook]);
  };

  const handleBookUpdated = (updatedBook: BookDTO) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleDeleteBook = () => {
    if (selectedBook) {
      bookService.deleteById(Number(selectedBook.id)).then(() => {
        setBooks(books.filter((book) => book.id !== selectedBook.id));
        closeDeleteModal();
      });
    }
  };

  return (
    <div className="table-container">
      <div className="button-container">
        <button type="button" className="add-button" onClick={openAddModal}>
          Adicionar um livro
        </button>
      </div>
      {books.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Ano</th>
              <th>Editar</th>
              <th>Vizualizar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.publicationYear}</td>
                <td>
                  <button
                    onClick={() => openEditModal(book)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleViewBook(book)}
                    className="view-button"
                  >
                    <FaEye />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => openDeleteModal(book)}
                    className="delete-button"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum livro cadastrado!</p>
      )}

      {selectedBook && (
        <ViewBookModal
          book={selectedBook}
          isOpen={isViewModalOpen}
          onClose={closeViewModal}
        />
      )}

      {isFormModalOpen && (
        <FormBookModal
          isOpen={isFormModalOpen}
          onClose={closeFormModal}
          book={selectedBook}
          onBookAdded={handleBookAdded}
          onBookUpdated={handleBookUpdated}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteBookModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDeleteBook}
        />
      )}
    </div>
  );
}
