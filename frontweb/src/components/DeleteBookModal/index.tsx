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
        <p>Tem certeza que deseja deletar esse livro ?</p>
        <div className="modal-buttons">
          <button onClick={onDelete} className="confirm-button">
            Sim, excluir
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
