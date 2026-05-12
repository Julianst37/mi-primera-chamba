import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type User } from "./UserValidator";
import { useImagePreview } from "./useImagePreview";

/**
 * Componente que utiliza el schema de UserValidator
 * con preview de imagen instantáneo
 */

export function UserValidatorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    mode: "onBlur"
  });

  const { previewUrl, fileName, onFileSelected } = useImagePreview();

  const onSubmit = async (data: User) => {
    
    try {
      alert("Usuario guardado correctamente");
      reset();
    } catch (error) {
      console.error("Error:", error);
      alert("Error al guardar el usuario");
    }
  };

  return (
    <div className="form-container">
      <h2>Validar Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Preview */}
        <div className="form-group image-group">
          <label htmlFor="image">Foto de Perfil (opcional):</label>
          <div className="image-upload-container">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={onFileSelected}
              className="image-input"
            />
            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="preview-image" />
                <div className="image-info">
                  <p className="file-name">{fileName}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username (3-20 caracteres):</label>
          <input
            id="username"
            placeholder="juan_dev"
            {...register("username")}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="usuario@example.com"
            {...register("email")}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        {/* Points */}
        <div className="form-group">
          <label htmlFor="points">Puntos (número positivo):</label>
          <input
            id="points"
            type="number"
            placeholder="100"
            {...register("points", { valueAsNumber: true })}
            className={errors.points ? "input-error" : ""}
          />
          {errors.points && (
            <p className="error-message">{errors.points.message}</p>
          )}
        </div>

        {/* Birth Date */}
        <div className="form-group">
          <label htmlFor="birthDate">Fecha de Nacimiento (opcional):</label>
          <input
            id="birthDate"
            type="date"
            {...register("birthDate", {
              setValueAs: (value) => value ? new Date(value) : undefined
            })}
            className={errors.birthDate ? "input-error" : ""}
          />
          {errors.birthDate && (
            <p className="error-message">{errors.birthDate.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Usuario"}
        </button>
      </form>

      <style>{`
        .form-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        }

        .form-container h2 {
          text-align: center;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          color: #333;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #0066cc;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }

        .input-error {
          border-color: #dc3545 !important;
          background-color: #fff5f5;
        }

        .error-message {
          color: #dc3545;
          font-size: 12px;
          margin-top: 5px;
          margin-bottom: 0;
        }

        /* Image Preview Styles */
        .image-group {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
        }

        .image-upload-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .image-input {
          padding: 15px;
          background: #fff;
          border: 2px dashed #0066cc;
          border-radius: 6px;
          cursor: pointer;
          transition: border-color 0.3s;
        }

        .image-input:hover {
          border-color: #0052a3;
        }

        .preview-container {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #f0f8ff;
          border-radius: 6px;
          border: 1px solid #0066cc;
          animation: slideIn 0.3s ease-in-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .preview-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 6px;
          border: 2px solid #0066cc;
        }

        .image-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
        }

        .file-name {
          margin: 0;
          font-size: 13px;
          color: #555;
          word-break: break-word;
        }

        /* Button Styles */
        button[type="submit"] {
          width: 100%;
          padding: 12px;
          background: #0066cc;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        button[type="submit"]:hover:not(:disabled) {
          background: #0052a3;
        }

        button[type="submit"]:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default UserValidatorForm;
