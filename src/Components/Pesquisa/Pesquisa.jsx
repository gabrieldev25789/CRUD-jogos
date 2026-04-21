import "./Pesquisa.css"

function Pesquisa({ valor, setValor, pesquisarJogos }) {

 return (
    <div className="search-wrapper">
        <input
            type="text"
            placeholder="Busque por um jogo..."
            value={valor}
            onChange={(e) => {
            setValor(e.target.value) 
            pesquisarJogos()}}
        />
    </div>
  );
}

export default Pesquisa