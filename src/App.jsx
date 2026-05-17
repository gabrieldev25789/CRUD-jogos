import { Routes, Route, Navigate } from 'react-router-dom'
import CriaConta from './pages/CriaConta'
import GameVault from './pages/GameVault'

  const usuariosCadastrados = []

function App() {
  return (
    <Routes>
      <Route path="/" element={<CriaConta usuarios={usuariosCadastrados}/>} />
      <Route path="/app" element={<GameVault />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
