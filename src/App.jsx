import { Routes, Route, Navigate } from 'react-router-dom'
import CriaConta from './pages/CriaConta'
import GameVault from './pages/GameVault'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CriaConta />} />
      <Route path="/app" element={<GameVault />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
