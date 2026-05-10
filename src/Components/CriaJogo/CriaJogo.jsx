import "./CriaJogo.css"
import MostraJogo from "../MostraJogo/MostraJogo";

function CriaJogo({ formData, formHandlers, addJogo, removerJogo, listaJogos, editarJogo, salvarEdicao, handleImagemChange, favoritarJogo, jogoFiltrado, valor, jogoFavorito, mostraFavorito, setMsg }) {

  const { nome, nota,  consideracoes, preview, ativo, favoritos } = formData
  const { setNome, setNota, setConsideracoes, setFavoritos } = formHandlers

  const jogosOrdenados = [...listaJogos].sort((a, b) => {
  const aFav = favoritos.includes(a.nome)
  const bFav = favoritos.includes(b.nome)

  if (aFav === bFav) return 0
  return aFav ? -1 : 1
})

  return (
    <div className="layout-wrapper">

      <div className="form-wrapper">
        <h2 className="form-title">
          Criar Jogo <span className="badge">novo</span>
        </h2>

        <div className="form-group">
          <label className="form-label">Capa do jogo</label>
          <div className="upload-area">
            <input type="file" accept="image/*" onChange={(e)=> handleImagemChange(e)} />
            <div className="upload-icon">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                <rect x="3" y="14" width="18" height="7" rx="2" />
              </svg>
            </div>
            <p className="upload-text">Clique ou arraste uma imagem</p>
          </div>
          {preview && <img src={preview} alt="Preview" className="preview-img" />}
        </div>

        <div className="form-group">
          <label className="form-label">Nome do jogo</label>
          <input
            type="text"
            placeholder="ex: The Last of Us"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="row-2">
          <div className="form-group">
            <label className="form-label">Nota</label>
            <div className="nota-wrapper">
              <input
                type="number"
                placeholder="0" min="0" max="10"
                value={nota}
                onChange={(e) => setNota(e.target.value)}
              />
              <span className="nota-suffix">/ 10</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Considerações</label>
          <textarea
            placeholder="Suas impressões sobre o jogo..."
            value={consideracoes}
            onChange={(e) => setConsideracoes(e.target.value)}
          />
        </div>

      {!ativo &&  
       <button className="btn-submit" onClick={() => addJogo()}>
          Adicionar Jogo
        </button> 
      }

      {ativo && 
       <button className="btn-submit" onClick={() => salvarEdicao(nome)}>Salvar alteração</button>
      } 
      </div>

      <div className="container-pai-wrapper ">
    {listaJogos.length > 0 && (
      <div className="container-pai">
        {jogosOrdenados.map((game) => {
          const indexOriginal = listaJogos.indexOf(game)
          return (
             <MostraJogo
                key={game.nome}
                imagem={game.imagem}
                nome={game.nome}
                nota={game.nota}
                status={game.status}
                consideracoes={game.consideracoes}
                removerJogo={() => removerJogo(indexOriginal)}
                editarJogo={() => editarJogo(indexOriginal)}
                favoritarJogo={() => favoritarJogo(indexOriginal)}
                favoritos={favoritos}
                setFavoritos={setFavoritos}
                jogoFiltrado={jogoFiltrado}
                valor={valor}
                jogoFavorito={jogoFavorito}
                mostraFavorito={mostraFavorito}
                setMsg={setMsg}
              />
            )
            })}
        </div>
        )}
      </div> 
    </div>
  )
}

export default CriaJogo