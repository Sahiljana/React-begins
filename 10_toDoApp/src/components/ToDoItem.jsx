import { useState } from "react";
import { useToDo } from "../contexts/ToDoContext";
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { format, isPast, differenceInCalendarDays } from "date-fns";

function ToDoItem({ todo, setFilter }) {
    const [isEditing, setIsEditing] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const [badgeClicked, setBadgeClicked] = useState(false); // animation trigger
    const { updatedTodo, deleteTodo, toggleComplete } = useToDo();

    const handleSave = () => {
        if (!todoMsg.trim()) return;
        updatedTodo(todo.id, { ...todo, todo: todoMsg.trim() });
        setIsEditing(false);
    };

    const handleCompleteToggle = () => {
        const wasCompleted = todo.completed;
        toggleComplete(todo.id);
        if (!wasCompleted) {
            confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 }, scalar: 0.8 });
        }
    };

    // Due date logic
    let dueDateDisplay = null;
    let dueStatusClass = "";
    let badgeLabel = "";
    const dueDate = todo.dueDate ? new Date(todo.dueDate) : null;

    if (dueDate) {
        const now = new Date();
        const diffDays = differenceInCalendarDays(dueDate, now);
        if (!todo.completed) {
            if (isPast(dueDate) && diffDays < 0) {
                dueStatusClass = "text-red-600 dark:text-red-400 font-semibold";
                badgeLabel = "Overdue";
            } else if (diffDays <= 2 && diffDays >= 0) {
                dueStatusClass = "text-orange-500 dark:text-orange-400 font-semibold";
                badgeLabel = "Due Soon";
            } else {
                dueStatusClass = "text-slate-600 dark:text-slate-400";
                badgeLabel = "On Time";
            }
        } else {
            dueStatusClass = "text-green-600 dark:text-green-400 line-through";
            badgeLabel = "Completed";
        }
        dueDateDisplay = format(dueDate, "MMM d, yyyy");
    } else {
        badgeLabel = todo.completed ? "Completed" : "No Due Date";
    }

    const badgeToFilterMap = {
        Overdue: "overdue",
        "Due Soon": "dueSoon",
        Completed: "completed",
        "On Time": "active",
        "No Due Date": "active"
    };

    const handleBadgeClick = () => {
        setBadgeClicked(true);
        if (setFilter && badgeToFilterMap[badgeLabel]) {
            setFilter(badgeToFilterMap[badgeLabel]);
        }
        setTimeout(() => setBadgeClicked(false), 200);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            layout
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl shadow
        ${todo.completed
                    ? "bg-green-100 dark:bg-green-900"
                    : "bg-purple-100 dark:bg-purple-900"} transition`}
        >
            <motion.div
                layout
                className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1"
                animate={todo.completed ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleCompleteToggle}
                    className="w-5 h-5 accent-green-500"
                />

                {isEditing ? (
                    <input
                        className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-2 py-1 rounded border border-slate-300 dark:border-slate-600 flex-1"
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span
                                className={`font-medium text-lg ${todo.completed
                                        ? "line-through text-gray-400 dark:text-gray-400"
                                        : "text-slate-800 dark:text-slate-100"
                                    }`}
                            >
                                {todo.todo}
                            </span>

                            {/* Clickable + Animated badge */}
                            <motion.span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBadgeClick();
                                }}
                                animate={badgeClicked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`cursor-pointer select-none px-2 py-0.5 text-xs rounded-full ${badgeLabel === "Overdue"
                                        ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                                        : badgeLabel === "Due Soon"
                                            ? "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200"
                                            : badgeLabel === "Completed"
                                                ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                                                : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                                    }`}
                                title={`Show only ${badgeLabel.toLowerCase()} tasks`}
                            >
                                {badgeLabel}
                            </motion.span>
                        </div>

                        {dueDateDisplay && (
                            <span className={`text-sm ${dueStatusClass}`}>Due: {dueDateDisplay}</span>
                        )}
                    </div>
                )}
            </motion.div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-2 sm:mt-0">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="p-2 rounded-lg bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white">
                            <CheckIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-slate-600 dark:hover:bg-slate-700 text-gray-600">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="p-2 rounded-lg bg-blue-400 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-900 text-white">
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => deleteTodo(todo.id)} className="p-2 rounded-lg bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white">
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}

export default ToDoItem;
