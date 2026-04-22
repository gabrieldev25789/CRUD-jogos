import "./Pesquisa.css"

function Pesquisa({ valor, pesquisarJogos }) {

 return (
    <div className="search-wrapper">
        <input
            type="text"
            placeholder="Busque por um jogo..."
            value={valor}
            onChange={(e) => pesquisarJogos(e.target.value)}
        />
    </div>
  );
}

export default Pesquisa