import {React, useState} from 'react'
import { useDispatch } from 'react-redux' // useDispatch hook ko import karte h
import { addTodo } from '../features/todo/todoSlice'

// AddTodo matlab store mei kuch add karna h aur add kaise karte h -> by dispatch method


function AddTodo() {

    const [input, setInput] = useState('') // input state ko useState se create karte h
    const dispatch = useDispatch() // useDispatch hook se dispatch function ko access karte h

    const addTodoHandler = (e) => {
        e.preventDefault();       // dispatch ek reducer ko use karte hue store mei value add karta h
        dispatch(addTodo({ text:input })); // addTodo action ko dispatch karte h aur input value ko pass karte h
        setInput('');             // input ko clean karte h
    }

    return (
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
          <input
            type="text"
            className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Enter a Todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Add Todo
          </button>
        </form>
      )
}

export default AddTodo