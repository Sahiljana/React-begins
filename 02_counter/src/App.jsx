import { useState } from 'react'            // yeh ek hook hi h
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter, setCounter] = useState(5)     // ek array hota h aur usmei 0 index pe hota h ek counter aur dusra ek function 
  // iss counter mei default value 5 hogi 
  //let counter = 5;

  const addValue = () => {
    console.log("Clicked", counter)
    //counter++;
    setCounter(counter + 1)
  }

  const removeValue = () => {
    setCounter(counter - 1)
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter Value : {counter}</h2>
      
      <button
      onClick={addValue}>Add Value</button>
      <br />
      <button
      onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
