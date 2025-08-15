import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts/ToDoContext";
import ToDoForm from "./components/ToDoForm";
import ToDoItem from "./components/ToDoItem";
import CalendarView from "./components/CalendarView";
import AnimatedBlobs from "./components/AnimatedBlobs";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import { isPast, differenceInCalendarDays, isSameDay, parseISO } from "date-fns";

// Branding & motivation
const customAppName = "JoyDo";
const motivationalLines = [
  "Brighten your day, one task at a time! 🌞",
  "Start where you are. Use what you have. Do what you can.",
  "Knock out your to-dos and celebrate the small wins! 🏆",
  "Little steps every day bring big changes.",
  "Every great day starts with a single task ✔️",
  "You're crushing it! 🚀",
  "Make today count. Joyfully!",
];
const getRandomMotivation = () =>
  motivationalLines[Math.floor(Math.random() * motivationalLines.length)];

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterPulse, setFilterPulse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [motivation] = useState(getRandomMotivation());
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(null);

  // Dark mode
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // CRUD functions
  const addTodo = (todo) => setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  const updatedTodo = (id, updated) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));
  const toggleComplete = (id) =>
    setTodos((prev) => prev.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (Array.isArray(stored) && stored.length) setTodos(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Pulse effect on filter
  const triggerFilterPulse = (filterName) => {
    setFilter(filterName);
    setFilterPulse(filterName);
    setTimeout(() => setFilterPulse(""), 800);
    // If closing calendar, clear selected date
    if (showCalendar) setCalendarDate(null);
  };

  // Main filter+search logic (calendarDate selected disables main filters)
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase());

    if (showCalendar && calendarDate) {
      // Calendar day view: match by exact date, ignore filter/search
      if (!todo.dueDate) return false;
      const dueDateObj =
        typeof todo.dueDate === "string"
          ? parseISO(todo.dueDate)
          : todo.dueDate;
      return isSameDay(dueDateObj, calendarDate);
    }

    let matchesStatus = true;
    if (filter === "active") {
      matchesStatus = !todo.completed;
    } else if (filter === "completed") {
      matchesStatus = todo.completed;
    } else if (filter === "dueSoon") {
      if (!todo.dueDate || todo.completed) matchesStatus = false;
      else {
        const diff = differenceInCalendarDays(
          new Date(todo.dueDate),
          new Date()
        );
        matchesStatus = diff <= 2 && diff >= 0;
      }
    } else if (filter === "overdue") {
      if (!todo.dueDate || todo.completed) matchesStatus = false;
      else {
        matchesStatus =
          isPast(new Date(todo.dueDate)) &&
          differenceInCalendarDays(
            new Date(todo.dueDate),
            new Date()
          ) < 0;
      }
    }
    return matchesStatus && matchesSearch;
  });

  return (
    <ToDoProvider
      value={{
        todos,
        addTodo,
        updatedTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      <AnimatedBlobs />
      <div className="fixed inset-0 bg-white/50 dark:bg-black/70 -z-10" />

      {/* Dark Mode Toggle */}
      <button
        className="fixed top-7 right-7 p-2 rounded-full bg-slate-200 dark:bg-slate-700 
                   shadow hover:scale-110 hover:bg-slate-300 dark:hover:bg-slate-600 
                   transition z-20"
        onClick={() => setDark((d) => !d)}
      >
        {dark ? (
          <SunIcon className="h-6 w-6 text-yellow-400" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-900 dark:text-yellow-200" />
        )}
      </button>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/85 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl 
                        shadow-lg p-10 sm:p-12 w-full max-w-5xl min-h-[80vh] mx-auto">
          {/* Header */}
          <div className="relative flex flex-col items-center mb-2">
            <div className="absolute h-16 w-60 sm:w-96 mx-auto -top-2 bg-gradient-to-r 
                            from-pink-400 via-cyan-400 to-purple-400 blur-xl opacity-20 
                            rounded-full -z-10 animate-pulse" />
            <h1 className="text-5xl font-extrabold text-slate-800 dark:text-slate-100 
                           flex items-center gap-3 justify-center">
              {customAppName}
              <span className="text-3xl animate-bounce">📝</span>
            </h1>
          </div>
          <p className="text-center text-slate-500 dark:text-slate-300 text-lg mb-7 italic">
            {motivation}
          </p>

          <ToDoForm />

          {/* Calendar Toggle Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setShowCalendar((v) => !v);
                setCalendarDate(null);
              }}
              className="mt-6 mb-4 px-6 py-2 rounded-full font-bold transition 
                bg-blue-600 hover:bg-blue-700 text-white shadow-lg 
                text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {showCalendar ? "Hide Calendar" : "Show Calendar"}
            </button>
          </div>


          {/* Calendar View, shows only when toggled */}
          {showCalendar && (
            <CalendarView
              todos={todos}
              onDateSelect={(date) => setCalendarDate(date)}
            />
          )}

          {/* Chosen date summary */}
          {showCalendar && calendarDate && (
            <div className="mb-4 text-center">
              <div className="font-bold mb-2">
                Todos due on {calendarDate.toLocaleDateString()}:
              </div>
              {/* List all tasks for this date */}
              {filteredTodos.length > 0 ? (
                <ul className="space-y-2">
                  {filteredTodos.map((todo) => (
                    <li
                      key={todo.id}
                      className={`px-4 py-2 rounded shadow bg-white/70 dark:bg-slate-900 flex items-center gap-2`}
                    >
                      <span
                        className={`font-medium flex-1 ${todo.completed
                          ? "line-through text-gray-400 dark:text-gray-400"
                          : "text-slate-800 dark:text-slate-100"
                          }`}
                      >
                        {todo.todo}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${todo.completed
                          ? "bg-green-300 dark:bg-green-800 text-green-900 dark:text-green-200"
                          : "bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100"
                          }`}
                      >
                        {todo.completed ? "Completed" : "Due"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-400">No todos due on this day.</div>
              )}
            </div>
          )}

          {/* --- Hide filters/search when calendar active (optional) --- */}
          {!showCalendar && (
            <>
              {/* Search */}
              <div className="mt-6 flex justify-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tasks..."
                  className="w-full max-w-sm px-4 py-2 rounded-full border border-slate-300 
                            dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 
                            text-slate-800 dark:text-slate-100 focus:outline-none 
                            focus:border-blue-500 dark:focus:border-blue-400 
                            placeholder-slate-400 dark:placeholder-slate-500 transition"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[
                  { key: "all", label: "All" },
                  { key: "active", label: "Active" },
                  { key: "completed", label: "Completed" },
                  { key: "dueSoon", label: "Due Soon" },
                  { key: "overdue", label: "Overdue" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => triggerFilterPulse(key)}
                    className={`px-4 py-1 rounded-full font-semibold capitalize transition
                      hover:scale-105 hover:shadow-md active:scale-95 focus:ring-2 focus:ring-blue-400
                      ${filter === key
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"}
                      ${filterPulse === key ? "flash-highlight" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Main Todo List */}
          {!showCalendar && (
            <div className="mt-6 space-y-4">
              {filteredTodos.length === 0 ? (
                <p className="text-slate-400 dark:text-slate-300 text-center">No tasks here.</p>
              ) : (
                <AnimatePresence>
                  {filteredTodos.map((todo) => (
                    <ToDoItem key={todo.id} todo={todo} setFilter={triggerFilterPulse} />
                  ))}
                </AnimatePresence>
              )}
            </div>
          )}
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
