import React, {useState, useContext} from 'react'
import UserContext from '../Context/UserContext'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext) // Step 2: Accessing the context

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password}) // Step 3: Updating the context with user data     // kaise data bhejna h
    }

  return (
    <div>
        <h2>Login</h2>
        <input type='text'
        value = {username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username' />
        {"  "}
        <input type='text'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password' />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login