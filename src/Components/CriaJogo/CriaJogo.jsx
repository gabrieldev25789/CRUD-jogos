import "./CriaJogo.css"
import { useState } from "react";

function CriaJogo() {

    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);

  function handleImagem(e) {
    const file = e.target.files[0];

    if (file) {
      setImagem(file);

      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

return (
    <div className="form-wrapper">

        <h2 className="form-title">
            Criar Jogo <span className="badge">novo</span>
        </h2>

        <div className="form-group">
            <label className="form-label">Capa do jogo</label>

            <div className="upload-area">

                <input type="file" accept="image/*" onChange={handleImagem} />

                <div className="upload-icon">
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                    <rect x="3" y="14" width="18" height="7" rx="2" />
                    </svg>
                </div>

                <p className="upload-text">Clique ou arraste uma imagem</p>

            </div>

            {preview && (
            <img src={preview} alt="Preview" className="preview-img" />
            )}
        </div>


        <div className="form-group">
            <label className="form-label">Nome do jogo</label>
            <input type="text" name="nome" placeholder="ex: The Last of Us" />
        </div>

        <div className="row-2">
            <div className="form-group">

            <label className="form-label">Nota</label>

                <div className="nota-wrapper">
                    <input type="number" name="nota" placeholder="0" min="0" max="10" />
                    <span className="nota-suffix">/ 10</span>
                </div>

            </div>

            <div className="form-group">

                <label className="form-label">Status</label>

                <select name="status">
                    <option value="">Selecione...</option>
                    <option value="jogando">Jogando</option>
                    <option value="zerado">Zerado</option>
                    <option value="dropado">Dropado</option>
                </select>
                
            </div>
        </div>

        <div className="form-group">
            <label className="form-label">Considerações</label>
            <textarea name="consideracoes" placeholder="Suas impressões sobre o jogo..." />
        </div>

        <button className="btn-submit" type="submit">
            Adicionar Jogo
        </button>
    </div>
  )
}

export default CriaJogo