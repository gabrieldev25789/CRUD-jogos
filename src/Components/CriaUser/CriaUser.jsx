import "./CriaUser.css"

function CriaUser({ criaUserAtivo, criaConta }) {

if(criaUserAtivo){
  return (
    <div className="card">
      <p className="label-top">Novo por aqui?</p>
      <h1>Crie sua conta</h1>
      <p className="subtitle">Preencha os dados abaixo para começar.</p>

      <div className="field">
        <label htmlFor="name">Nome completo</label>
        <input id="name" type="text" placeholder="Seu nome" autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input id="email" type="email" placeholder="seu@email.com" autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" placeholder="••••••••" autoComplete="new-password" />
        <p className="hint">Mínimo de 8 caracteres.</p>
      </div>

      <div className="field">
        <label htmlFor="confirm">Confirmar senha</label>
        <input id="confirm" type="password" placeholder="••••••••" autoComplete="new-password" />
      </div>

      <button type="button" onClick={() => criaConta()}>Criar conta</button>

      <p className="login-link">
        Já tem conta? <a href="#">Entrar</a>
      </p>
    </div>
  );
}
}

export default CriaUser;