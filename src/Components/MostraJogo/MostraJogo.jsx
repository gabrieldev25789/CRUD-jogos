import "./MostraJogo.css"
import CriaJogo from "../CriaJogo/CriaJogo"

function MostraJogo({ imagem, nome, nota, status, consideracoes }) {
  return (
    <div className="game-card">

        <div className="game-card-cover">
            <img src={imagem} alt={`Capa de ${nome}`} />
            <span className={`game-card-status status-${status}`}>{status}</span>
        </div>

        <div className="game-card-info">
            <h2 className="game-card-nome">{nome}</h2>
            <p className="game-card-consideracoes">{consideracoes}</p>
        </div>

        <div className="game-card-footer">
            <span className="game-card-nota">⭐ {nota} / 10</span>
        </div>

    </div>
  )
}

export default MostraJogo