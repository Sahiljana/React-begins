import { useState } from "react";
import { useToDo } from "../contexts/ToDoContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ToDoForm() {
    const [todo, setTodo] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const { addTodo } = useToDo();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.trim()) return;
        addTodo({
            todo: todo.trim(),
            completed: false,
            dueDate: dueDate ? dueDate.toISOString() : null
        });
        setTodo("");
        setDueDate(null);
    };

    return (
        <form className="flex flex-col sm:flex-row items-center gap-3" onSubmit={handleSubmit}>
            <input
                className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-400 dark:border-slate-600
                   bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100
                   focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition shadow"
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Write Todo..."
            />
            <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                placeholderText="Due date (optional)"
                className="px-3 py-2 rounded-lg border-2 border-slate-400 dark:border-slate-600
                   bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100
                   focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition shadow sm:w-48 w-full"
                dateFormat="MMM d, yyyy"
                isClearable
            />
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700
                   hover:scale-105 hover:shadow-md active:scale-95
                   text-white px-6 py-2 rounded-lg font-semibold transition"
            >
                Add
            </button>
        </form>
    );
}

export default ToDoForm;
