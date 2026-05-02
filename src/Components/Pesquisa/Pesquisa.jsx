import "./Pesquisa.css"

function Pesquisa({ valor, pesquisarJogos, listaJogos }) {
    let vazio = false 

    if(listaJogos.length === 0){
        vazio = true
    }

  return (
    <div className={vazio ? "search-wrapper hide" : "search-wrapper "}>
      <input
        type="text"
        placeholder="Busque por um jogo..."
        value={valor}
        onChange={(e) => pesquisarJogos(e.target.value)}
      />
    </div>
  )
}

export default Pesquisa