import { useForm } from "react-hook-form";
import { BookDTO } from "../../models/book";
import "./styles.css";
import { useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../../utils/requests";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  book: BookDTO | null;
  onBookAdded: (book: BookDTO) => void;
  onBookUpdated: (book: BookDTO) => void;
};

export default function FormBookModal({
  isOpen,
  onClose,
  book,
  onBookAdded,
  onBookUpdated
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookDTO>();

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("sinopse", book.sinopse);
      setValue("imgUrl", book.imgUrl);
      setValue("publicationYear", book.publicationYear);
    } else {
      reset();  // Reset the form if it's a new book creation
    }
  }, [book, setValue, reset]);

  if (!isOpen) return null;

  function onSubmit(formData: BookDTO) {
    const config: AxiosRequestConfig = {
      method: book ? "PUT" : "POST",
      url: book ? `/books/${book.id}` : "/books",
      data: formData,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      if (book) {
        onBookUpdated(response.data);
      } else {
        onBookAdded(response.data);
      }
      onClose();
      reset();
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book ? "Editar livro" : "Adicionar livro"}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)} className="add-book-form">
            <div className="form-group">
              <label>Titulo:</label>
              <input type="text" {...register("title", { required: true })} />
              {errors.title && (
                <span className="error-message">Inserir o titulo</span>
              )}
            </div>
            <div className="form-group">
              <label>Resumo:</label>
              <textarea {...register("sinopse", { required: true })} />
              {errors.sinopse && (
                <span className="error-message">Inserir o resumo do livro</span>
              )}
            </div>
            <div className="form-group">
              <label>Ano:</label>
              <input
                type="number"
                {...register("publicationYear", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              {errors.publicationYear && (
                <span className="error-message">
                  Inserir o ano de publicação
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Imagem da capa:</label>
              <input type="text" {...register("imgUrl")} />
            </div>
            <div className="modal-footer">
              <button type="submit" className="save-button">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
