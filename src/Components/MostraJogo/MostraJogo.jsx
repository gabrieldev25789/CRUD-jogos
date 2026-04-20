import "./MostraJogo.css"

function MostraJogo({ imagem, nome, status, consideracoes, nota, removerJogo, editarJogo, favoritos, setFavoritos }) {
  const badgeClass = {
    jogando: "b-playing",
    zerado:  "b-done",
    dropado: "b-dropped",
    pausado: "b-paused",
  }[status] ?? "b-playing";

  const stars = Array.from({ length: 5 }, (_, i) => (
    <div key={i} className={`star ${i < Math.round(nota / 2) ? "on" : ""}`} />
  ));

  const isFavorito = favoritos.includes(nome)

  function toggleFavorito() {
    setFavoritos(prev =>
      prev.includes(nome)
        ? prev.filter(n => n !== nome)
        : [nome, ...prev]
    )
  }

  return (
    <div className={isFavorito ? "gc favorito" : "gc"}>
      <div className="gc-cover">
        {imagem
          ? <img src={imagem} alt={`Capa de ${nome}`} />
          : <div className="gc-cover-placeholder">🎮</div>
        }
      </div>

      <div className="gc-info">
        <h2 className="gc-title">{nome}</h2>
        <p className="gc-desc">{consideracoes}</p>
      </div>

      <div className="gc-footer">
        <span className="gc-score">{nota} / 10</span>
        <div className="gc-stars">{stars}</div>
        <span className={`gc-badge ${badgeClass}`}>{status}</span>

        <span className="btns">
          <button
            onClick={toggleFavorito}
            className={`fav-btn ${isFavorito ? "ativo" : ""}`}
          >
            {isFavorito ? "★ Favoritado" : "☆ Favoritar"}
          </button>
          <button onClick={editarJogo} className="edit-btn">editar</button>
          <button onClick={removerJogo} className="remove-btn">Remover</button>
        </span>
      </div>
    </div>
  );
}

export default MostraJogo