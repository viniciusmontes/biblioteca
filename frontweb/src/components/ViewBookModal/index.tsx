import "./styles.css";

import { BookDTO } from "../../models/book";

type Props = {
  book: BookDTO;
  isOpen: boolean;
  onClose: () => void;
};

export default function ViewBookModal({ book, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book.title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-body-image-container">
            <img src={book.imgUrl} alt={book.title}/>
          </div>
          <p>
            <strong>Synopsis:</strong> {book.sinopse}
          </p>
          <p>
            <strong>Publication Year:</strong> {book.publicationYear}
          </p>
        </div>
      </div>
    </div>
  );
}
