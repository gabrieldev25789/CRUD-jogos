import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import CriaJogo from '../Components/CriaJogo/CriaJogo'
import Mensagem from '../Components/Mensagem/Mensagem'
import Pesquisa from '../Components/Pesquisa/Pesquisa'

function GameVault() {
  const navigate = useNavigate()

  const [imagem, setImagem] = useState(null)
  const [preview, setPreview] = useState(null)
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
  const [guardaNome, setGuardaNome] = useState([])
  const [valor, setValor] = useState("")
  const [jogoFiltrado, setJogoFiltrado] = useState([])
  const [achado, setAchado] = useState(false)
  const [mostraFavorito, setMostraFavorito] = useState(false)

  function sair() {
    navigate("/")
  }

  function handleImagem(e) {
    const file = e.target.files[0]
    if (file) {
      setImagem(file)
      setPreview(URL.createObjectURL(file))
    }
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

  function addJogo() {
    if (nota > 10 || nota < 0) {
      setShowMsg(true)
      setMsg("Nota invalida")
      return
    }

    if (!imagem || !preview || !nome || !nota || !consideracoes) {
      setShowMsg(true)
      setMsg("Preencha todos os campos")
      return
    }

    const jaExiste = guardaNome.includes(nome)

    if (!jaExiste) {
      setGuardaNome((prev) => [...prev, nome])
    }

    if (jaExiste) {
      setShowMsg(true)
      setMsg("Já existe um jogo com esse nome")
      return
    }

    setListaJogos((prev) => [...prev, { id: Date.now(), imagem: preview, nome, nota, status, consideracoes }])
    setMsg("Jogo adicionado")
    setMostrar(true)
    setPreview(null)
    setNome("")
    setNota("")
    setStatus("")
    setConsideracoes("")
    setShowMsg(false)
    setValor("")
  }

  const [escondeBtn, setEscondeBtn] = useState(false)

  function editarJogo(index) {
    setEscondeBtn(true)
    const jogo = listaJogos[index]
    setAtivo(true)
    setPreview(jogo.preview)
    setNome(jogo.nome)
    setNota(jogo.nota)
    setStatus(jogo.status)
    setConsideracoes(jogo.consideracoes)
    setImagem(jogo.imagem)
    setEditIndex(index)
  }

  function salvarEdicao() {
    setEscondeBtn(false)
    const nomeAtual = listaJogos[editIndex].nome
    const jaExiste = guardaNome.includes(nome) && nome !== nomeAtual

    if (nota > 10) {
      setShowMsg(true)
      setMsg("Nota invalida")
      return
    }

    if (jaExiste) {
      setShowMsg(true)
      setMsg("Já existe um jogo com esse nome")
      return
    }

    const novaLista = listaJogos.map((jogo, i) =>
      i === editIndex ? { imagem, nome, nota, status, consideracoes, preview } : jogo
    )

    setListaJogos(novaLista)
    setEditIndex(null)
    setGuardaNome(prev => [...prev.filter(n => n !== nomeAtual), nome])
    setFavoritos(prev => prev.map(n => n === nomeAtual ? nome : n))
    setPreview("")
    setNome("")
    setNota("")
    setStatus("")
    setConsideracoes("")
    setImagem("")
    setAtivo(false)
  }

  function removerJogo(index) {
    setListaJogos(prev => prev.filter((_, i) => i !== index))
    if (!index) setMostrar(false)
  }

  function pesquisarJogos(termoBusca) {
    setValor(termoBusca)

    const filtrados = listaJogos.filter(jogo =>
      jogo.nome.toLowerCase().includes(termoBusca.toLowerCase())
    )

    const achou = filtrados.length > 0

    setAchado(achou)
    setShowMsg(!achou)
    setTimeout(() => setMsg(achou ? "" : "Nenhum jogo encontrado"), 200)
    setJogoFiltrado(achou ? filtrados : [])
  }

  function mostrarFavoritos() {
    const abrindo = !mostraFavorito
    setMostraFavorito(prev => !prev)

    if (abrindo && favoritos.length === 0) {
      setTimeout(() => {
        setShowMsg(true)
        setMsg("Nenhum jogo favoritado ainda!")
        setTimeout(() => setShowMsg(false), 1500)
      }, 0)
    }
  }

  const formData = { nome, nota, status, consideracoes, preview, mostrar, ativo, favoritos }
  const formHandlers = { setNome, setNota, setStatus, setConsideracoes, handleImagem, setFavoritos }

  const location = useLocation()
  const user = location.state?.user 

  return (
    <>
      {showMsg && <Mensagem mensagem={msg} />}

      <Pesquisa
        listaJogos={listaJogos}
        valor={valor}
        setValor={setValor}
        pesquisarJogos={pesquisarJogos}
        onSair={sair}
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
        mostraFavorito={mostraFavorito}
        setMsg={setMsg}
        escondeBtn={escondeBtn}
        user={user}
      />

      {listaJogos.length > 0 && (
        <button onClick={mostrarFavoritos}>
          {mostraFavorito ? "Mostrar todos os jogos" : "Mostrar favoritos"}
        </button>
      )}
    </>
  )
}

export default GameVault