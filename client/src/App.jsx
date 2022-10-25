import { useEffect } from 'react'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [dadosApi, setDadosApi] = useState(undefined)

  function callJson(){
    
  }

  useEffect(() => {
    console.log("componente montado")
    fetch("http://localhost:8000/livros")
      .then((res) => res.json())
      .then((obj) => setDadosApi(obj)) 
  },[])

  if (dadosApi === undefined) return <div>Carregando...</div>

  return (
    <div>
      <p>Fetch API with React</p>
      <button onClick={()=>{ setCount(count + 1)}}>{count}</button>
      <button onClick={callJson}></button>
      {dadosApi.map((livro) => (
        <div>
          <h1>{livro.name}</h1>
          <p>{livro.author}</p>
        </div>
      ))}
    </div>
  )
}