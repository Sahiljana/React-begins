import { createSlice, nanoid } from "@reduxjs/toolkit";      //used for creating reducers and nanaid unique ids ko generate karta h bass

const initialState = {
    todos: [{id: 1, text: "Hello World"}]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload.text,  //action.payload se hum action ki value ko access karte h
            }
            state.todos.push(todo);      //state.todos me hum todo ko push karte h
        },                     // state jo humare at present current state h uske values ka access deti h
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id); //filter method se hum todos ko filter karte h aur jo id match nahi karti usko remove kar dete h
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload; //action.payload se hum id aur text ko destructure karte h
            const todo = state.todos.find(todo => todo.id === id); //find method se hum todos me se wo todo dhundte h jiska id match karta h
            if (todo) {
                todo.text = text; //agar todo mil jata h to uska text update kar dete h
            }
        },
    }
})

export const { addTodo, removeTodo, updateTodo, deleteTodo } = todoSlice.actions; //actions ko export karte h jisse hum inhe component me use kar sake

export default todoSlice.reducer; //reducer ko export karte h jisse hum store me use kar sake