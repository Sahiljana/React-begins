import { useMemo } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CalendarView({ todos, onDateSelect }) {
    const dateHighlightSet = useMemo(
        () =>
            new Set(
                todos
                    .filter((todo) => todo.dueDate && !todo.completed)
                    .map((todo) => new Date(todo.dueDate).toDateString())
            ),
        [todos]
    );

    return (
        <div className="flex justify-center">
            <div className="
        bg-white/90 dark:bg-slate-800/80 
        backdrop-blur-md rounded-2xl shadow-lg p-6 
        max-w-fit border border-blue-200 dark:border-slate-700
        flex flex-col items-center
        ">
                <Calendar
                    tileClassName={({ date }) =>
                        dateHighlightSet.has(date.toDateString())
                            ? "joydo-calendar-marker"
                            : ""
                    }
                    onClickDay={onDateSelect}
                    calendarType="gregory"
                    next2Label={null}
                    prev2Label={null}
                />
                <style>
                    {`
            .joydo-calendar-marker {
              background: #2563eb;
              color: white !important;
              border-radius: 50%;
            }
            .react-calendar {
              background: transparent !important;
              border: none !important;
              font-size: 1.1rem;
              min-width: 340px;
              box-shadow: none;
            }
            .react-calendar__tile {
              border-radius: 0.7em;
              transition: background 0.2s, color 0.2s, box-shadow 0.2s;
              margin: 2px;
            }
            .react-calendar__tile--active {
              background: #1e40af !important;
              color: white !important;
              font-weight: bold;
              box-shadow: 0 2px 8px rgba(37,99,235, .15);
            }
            .react-calendar__tile:enabled:hover,
            .react-calendar__tile:focus {
              background: #60a5fa !important;
              color: #fff;
            }
            .dark .react-calendar {
              background: transparent !important;
              color: #e5e7eb;
            }
          `}
                </style>
            </div>
        </div>
    );
}

export default CalendarView;
