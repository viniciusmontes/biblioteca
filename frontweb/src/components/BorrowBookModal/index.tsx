import { useState } from "react";
import * as bookService from "../../services/book-service";
import { BookDTO } from "../../models/book";
import "./styles.css";
import { toast } from "react-toastify";

type BorrowBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: BookDTO | null;
};

export default function BorrowBookModal({
  isOpen,
  onClose,
  book,
}: BorrowBookModalProps) {
  const [userId, setUserId] = useState<string>("");

  const handleBorrowBook = () => {
    if (book && userId) {
      bookService
        .borrowBook(book.id, Number(userId))
        .then(() => {
          toast.success("Livro emprestado com sucesso!");
          onClose();
        })
        .catch(() => {
          toast.error("Erro ao emprestar o livro!");
        });
    }
  };

  if (!isOpen || !book) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Emprestar Livro</h2>
        <div className="borrow-book-image-container">
          <img src={book.imgUrl} alt="" />
        </div>
        <p>{`Você deseja emprestar o livro: ${book.title}?`}</p>
        <input
          type="text"
          placeholder="Digite o ID do usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleBorrowBook} className="borrow-button">
            Emprestar
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
