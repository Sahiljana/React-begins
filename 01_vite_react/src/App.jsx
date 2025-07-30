import { use } from "react"
import Chai from "./chai"

function App() {
  const username = "Sahil"  

  return (
    <>
      <Chai/>
      <h1>Chai aur coding with {username}</h1>        // yeh username ek evaluated expression h matlab ki yeh final result hi dikhayega username ka
      <p>Test para</p>
    </>
  )
}

export default App
