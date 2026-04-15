import { useState } from 'react'
import './App.css'
import CriaJogo from './Components/CriaJogo/CriaJogo'

function App() {

    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);
    const [listaJogos, setListaJogos] = useState([])

    const [nome, setNome] = useState("")
    const [nota, setNota] = useState(0)
    const [status, setStatus] = useState("")
    const [consideracoes, setConsideracoes] = useState("")

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
    if(nota > 10 || nota < 0){
    alert("Nota invalida")
    return 
    }

    if(
    !imagem
    || !preview 
    || !nome 
    || !status 
    || !nota 
    || !consideracoes) {
    alert("Preencha todos os campos")
    return 
    } 

    setListaJogos((prev) => [...prev, newGame])

    setPreview(null)
    setNome("")
    setNota("")
    setStatus("")
    setConsideracoes("")
  }

  
function removerJogo(index) {
  setListaJogos(prev => prev.filter((_, i) => i !== index))
}

  const formData = { nome, nota, status, consideracoes, preview }
  const formHandlers = { setNome, setNota, setStatus, setConsideracoes, handleImagem }

  return (
    <>
    <CriaJogo 
      formData={formData}
      formHandlers={formHandlers}
      addJogo={addJogo}
      removerJogo={removerJogo}
      listaJogos={listaJogos}
    />
    </>
  )
}

export default App
