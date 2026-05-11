import { useEffect, useState } from "react"
import "./CriaConta.css"
import { useNavigate } from 'react-router-dom'

function CriaConta() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmaSenha, setConfirmaSenha] = useState("")
  const [entrar, setEntrar] = useState(false)

  const [user, setUser] = useState({})

  const navigate = useNavigate()

function addUser() {
    if (!email || !senha || !confirmaSenha) {
      alert("Preencha todos os campos")
      return
    }
    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem")
      return
    }
    setUser({nome: nome, email: email, senha: senha})

    navigate("/app")
  }

  useEffect(() => {
    console.log(user)
  }, [user])

  // ✅ return único com condicional dentro
  return (
    <div className="cria-page">
      <div className="cria-left">
        <div className="cria-logo">
          <div className="cria-logo-icon">🎮</div>
          <span className="cria-logo-name">GameVault</span>
        </div>
        <p className="cria-hero-tag">Plataforma de jogos</p>
        <h2 className="cria-hero-title">Organize sua <span>coleção</span></h2>
        <p className="cria-hero-desc">Guarde, pesquise e favorite seus jogos em um só lugar.</p>
        <div className="cria-features">
          <div className="cria-feature"><div className="cria-dot" />Cadastre seus jogos</div>
          <div className="cria-feature"><div className="cria-dot" />Marque favoritos</div>
          <div className="cria-feature"><div className="cria-dot" />Pesquise rapidamente</div>
        </div>
      </div>

      <div className="cria-right">
        <div className="cria-card">

          {!entrar ? (
            // ✅ Tela de criar conta
            <>
              <p className="cria-label-top">Novo por aqui?</p>
              <h1>Crie sua conta</h1>
              <p className="cria-subtitle">Preencha os dados abaixo para começar.</p>

              <div className="cria-field">
                <label htmlFor="nome">Nome</label>
                <input id="nome" type="nome" placeholder="seu nome de user"               autoComplete="nome"
                value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>

              <div className="cria-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="seu@email.com" autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="cria-field">
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" placeholder="••••••••" autoComplete="new-password"
                  value={senha} onChange={(e) => setSenha(e.target.value)} />
                <p className="cria-hint">Mínimo de 8 caracteres.</p>
              </div>
              <div className="cria-field">
                <label htmlFor="confirm">Confirmar senha</label>
                <input id="confirm" type="password" placeholder="••••••••" autoComplete="new-password"
                  value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} />
              </div>

              <button className="cria-btn" type="button" onClick={addUser}>Criar conta</button>
              <p className="cria-login-link">
                Já tem conta? <a href="#" onClick={() => setEntrar(true)}>Entrar</a>
              </p>
            </>
          ) : (
            // ✅ Tela de login
            <>
              <p className="cria-label-top">Bem-vindo de volta!</p>
              <h1>Entre na sua conta</h1>

              <div className="cria-field">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="seu@email.com" autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="cria-field">
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" placeholder="••••••••" autoComplete="current-password"
                  value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>

              <button className="cria-btn" type="button" onClick={() => navigate("/app")}>Entrar</button>
              <p className="cria-login-link">
                Não tem conta? <a href="#" onClick={() => setEntrar(false)}>Criar conta</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CriaConta