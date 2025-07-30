import { useState } from "react";
import './App.css'

function App() {
  const [color, setColor] = useState("olive");

  return (
    <div
      className="w-full h-screen"
      style={{ backgroundColor: color }}
    >
      
      <div className="fixed inset-x-0 bottom-12 flex justify-center px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-xl bg-black px-3 py-2 rounded-3xl">
          <button
            onClick={() => setColor("red")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "red" }}
          >
            Red
          </button>
          <button
            onClick={() => setColor("green")}
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "green" }}
          >
            Green
          </button>
          <button
            onClick={() => setColor("blue")}
            className="outline-none px-1 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Blue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
