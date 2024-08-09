import "./styles.css";

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteBookModal({ isOpen, onClose, onDelete }: DeleteBookModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this book?</p>
        <div className="modal-buttons">
          <button onClick={onDelete} className="confirm-button">
            Yes, Delete
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
