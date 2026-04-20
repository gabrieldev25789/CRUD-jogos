import { useEffect, useState } from 'react'
import "./Mensagem.css"

function Mensagem({mensagem}) {

const [mostrar, setMostrar] = useState(false)

useEffect(() => {
  const timer = setTimeout(() => {
    setMostrar(true)
  }, 2000)

  return () => clearTimeout(timer) // limpa se o componente desmontar
}, [])

return (
  <div>
    {mostrar && <h2 className="mensagem-titulo">{mensagem}</h2>}
  </div>
)
}

export default Mensagem