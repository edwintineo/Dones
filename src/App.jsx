import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Dones Espirituales</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Sitio en construcción. Pronto estará disponible.
        </p>
      </div>
    </>
  )
}

export default App