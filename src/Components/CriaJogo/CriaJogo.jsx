import "./CriaJogo.css"
import { useState } from "react";
import MostraJogo from "../MostraJogo/MostraJogo";

function CriaJogo() {
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);

    const [nome, setNome] = useState("")
    const [nota, setNota] = useState(0)
    const [status, setStatus] = useState("")
    const [consideracoes, setConsideracoes] = useState("")

    const [listaJogos, setListaJogos] = useState([])

  function handleImagem(e) {
    const file = e.target.files[0];

    if (file) {
      setImagem(file);

      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  function addJogo(){

    const newGame = {
    id: Date.now(),
    imagem: preview,
    nome,
    nota,
    status,
    consideracoes
  }

    setListaJogos((prev) => [...prev, newGame])

    setPreview(null)
    setNome("")
    setNota("")
    setStatus("")
    setConsideracoes("")

    if(nota > 10 || nota < 0){
    alert("Nota invalida")
    return 
    }

    if(!imagem 
    || !nome 
    || !status 
    || !nota 
    || !consideracoes) {
    alert("Preencha todos os campos")
    } 
  }

return (
    <>
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
            <input 
            type="text"  
            placeholder="ex: The Last of Us" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}/>
        </div>

        <div className="row-2">
            <div className="form-group">

            <label className="form-label">Nota</label>

                <div className="nota-wrapper">
                    <input 
                    type="number" 
                    placeholder="0" min="0" max="10" 
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}/>
                    <span className="nota-suffix">/ 10</span>
                </div>

            </div>

            <div className="form-group">

            <label className="form-label">Status</label>

            <input 
                type="text" 
                placeholder="ex: gostando..."
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
                
            </div>
        </div>

        <div className="form-group">
            <label className="form-label">Considerações</label>
            <textarea 
            placeholder="Suas impressões sobre o jogo..." 
            value={consideracoes}
            onChange={(e) => setConsideracoes(e.target.value)}/>
        </div>

        <button className="btn-submit"  onClick={() => addJogo()}>
            Adicionar Jogo
        </button>
    </div>

    <div>
        {listaJogos.map((game)=>{
            return (
            <MostraJogo 
                key={game.id}
                imagem={game.imagem}
                nome={game.nome}
                nota={game.nota}
                status={game.status}
                consideracoes={game.consideracoes}
            />
            )
        })}
    </div>
</>

  )
}

export default CriaJogo