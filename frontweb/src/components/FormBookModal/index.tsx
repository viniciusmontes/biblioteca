import { useForm } from 'react-hook-form';
import { BookDTO } from "../../models/book";
import * as bookService from "../../services/book-service";
import './styles.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onBookAdded: (book: BookDTO) => void;
};

type FormInputs = {
  title: string;
  sinopse: string;
  publicationYear: number;
  imgUrl: string;
};

export default function FormBookModal({ isOpen, onClose, onBookAdded }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();

  if (!isOpen) return null;

  function onSubmit(data: FormInputs) {
    const newBook: BookDTO = {
      id: "", // O backend deve gerar o ID
      title: data.title,
      sinopse: data.sinopse,
      publicationYear: data.publicationYear,
      imgUrl: data.imgUrl,
    };

    bookService.insertRequest(newBook).then((response) => {
      onBookAdded(response.data);
      onClose();
      reset(); // Reseta o formulário após o envio
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Book</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)} className="add-book-form">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title && <span className="error-message">Title is required</span>}
            </div>
            <div className="form-group">
              <label>Synopsis:</label>
              <textarea
                {...register("sinopse", { required: true })}
              />
              {errors.sinopse && <span className="error-message">Synopsis is required</span>}
            </div>
            <div className="form-group">
              <label>Publication Year:</label>
              <input
                type="number"
                {...register("publicationYear", { required: true, valueAsNumber: true })}
              />
              {errors.publicationYear && <span className="error-message">Publication Year is required</span>}
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                {...register("imgUrl")}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
