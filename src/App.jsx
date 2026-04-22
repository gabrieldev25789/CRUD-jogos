import { useState } from 'react'

import CriaJogo from './Components/CriaJogo/CriaJogo'
import Mensagem from './Components/Mensagem/Mensagem';
import Pesquisa from './Components/Pesquisa/Pesquisa';

function App() {

    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);
    const [listaJogos, setListaJogos] = useState([])

    const [nome, setNome] = useState("")
    const [nota, setNota] = useState(0)
    const [status, setStatus] = useState("")
    const [consideracoes, setConsideracoes] = useState("")

    const [mostrar, setMostrar] = useState(false)

    const [editIndex, setEditIndex] = useState(null)

    const [ativo, setAtivo] = useState(false)

    const [msg, setMsg] = useState("")
    const [showMsg, setShowMsg] = useState(false)

    const [favoritos, setFavoritos] = useState([])

    function handleImagem(e) {
    const file = e.target.files[0];

    if (file) {
      setImagem(file);

      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  const [guardaNome, setGuardaNome] = useState([])

  function addJogo() {
    if (nota > 10 || nota < 0) {
      setShowMsg(true)
      setMsg("Nota invalida")
      return;
    }

    if (!imagem || !preview || !nome || !status || !nota || !consideracoes) {
      setShowMsg(true)
      setMsg("Preencha todos os campos")
      return;
    }

    const jaExiste = guardaNome.includes(nome)

    if (!jaExiste) {
      setGuardaNome((prev) => [...prev, nome])
    }

    if(jaExiste){
      setShowMsg(true)
      setMsg("Já existe um jogo com esse nome")
      return 
    }

    const newGame = {
      id: Date.now(),
      imagem: preview,
      nome,
      nota,
      status,
      consideracoes,
    };

    setListaJogos((prev) => [...prev, newGame]);
    setMsg("Jogo adicionado")
    setMostrar(true);

    setPreview(null);

    const setters = [setNome, setNota, setStatus, setConsideracoes]
    setters.forEach((setter)=>{
      setter("")
    })
    
    setShowMsg(false)
}

function handleImagemChange(e) {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onloadend = () => {
    setImagem(reader.result) 
    setPreview(reader.result)
  }
  reader.readAsDataURL(file)
}

function editarJogo(index){
  setAtivo(true)
  const jogo = listaJogos[index]

  setPreview(jogo.preview)
  setNome(jogo.nome)
  setNota(jogo.nota)
  setStatus(jogo.status)
  setConsideracoes(jogo.consideracoes)

  setImagem(jogo.imagem)

  setEditIndex(index)
  console.log(index)
}

function salvarEdicao() {
  const nomeAtual = listaJogos[editIndex].nome
  const jaExiste = guardaNome.includes(nome) && nome !== nomeAtual
  if(nota > 10) {
    setShowMsg(true)
    setMsg("Nota invalida")
    return 
  }
  if (jaExiste) {
    setShowMsg(true)
    setMsg("Já existe um jogo com esse nome")
    return
  }

  const novaLista = listaJogos.map((jogo, index) => {
    if (index === editIndex) {
      return { imagem, nome, nota, status, consideracoes, preview }
    }
    return jogo
  })

  setListaJogos(novaLista)
  setEditIndex(null)

  setGuardaNome(prev => [...prev.filter(n => n !== nomeAtual), nome])

  setFavoritos(prev =>
    prev.map(n => n === nomeAtual ? nome : n)
  )

  const setters = [setPreview, setNome, setNota, setStatus, setConsideracoes, setImagem]
  setters.forEach(setter => setter(""))
  setAtivo(false)
}

function removerJogo(index) {
  setListaJogos(prev => prev.filter((_, i) => i !== index))

  if(!index){
    setMostrar(false)
  }
}

const [valor, setValor] = useState("")

/*const [mostrarFavorito, setMostrarFavorito] = useState(false)*/

const [jogoFiltrado, setJogoFiltrado] = useState([])

/*const [jogoFavorito, setJogoFavorito] = useState([])*/
const [achado, setAchado] = useState(false)

function pesquisarJogos(termoBusca) {
  setValor(termoBusca)

  const filtrados = listaJogos.filter((jogo) =>
    jogo.nome.toLowerCase().includes(termoBusca.toLowerCase())
  )

  const achou = filtrados.length > 0

  setAchado(achou)
  setShowMsg(!achou)
  setMsg(achou ? "" : "Nenhum jogo encontrado")
  setJogoFiltrado(achou ? filtrados : [])
}

/*
function pesquisarJogosFavoritos(){
  setMostrarFavorito(true)
  console.log(favoritos)
  setJogoFavorito(favoritos)
  console.log(jogoFavorito)
}
*/


  const formData = { nome, nota, status, consideracoes, preview, mostrar, ativo, favoritos }
  const formHandlers = { setNome, setNota, setStatus, setConsideracoes, handleImagem, setFavoritos }

  return (
  <>
    {showMsg && <Mensagem mensagem={msg}/>}

    <Pesquisa 
      listaJogos={listaJogos}
      valor={valor}
      setValor={setValor}
      pesquisarJogos={pesquisarJogos}
    />

    <CriaJogo 
      formData={formData}
      formHandlers={formHandlers}
      handleImagemChange={handleImagemChange}
      addJogo={addJogo}
      removerJogo={removerJogo}
      listaJogos={listaJogos}
      editarJogo={editarJogo}
      salvarEdicao={salvarEdicao}
      jogoFiltrado={jogoFiltrado}
      valor={valor}
      achado={achado}
    /*jogoFavorito={jogoFavorito}*/
    />
   {/* <button onClick={() => pesquisarJogosFavoritos()}>Mostrar jogos favoritos</button> */ }
  </>
  )
}

export default App
