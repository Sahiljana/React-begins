import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiCopy } from "react-icons/fi"; // npm install react-icons

function App() {
  // State for password length, number and character inclusion, and the password itself
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // Password generator function
  const passwordGenerator = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999); // For mobile devices //utne range tak hi select hoga
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // Generate password when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800">
      <div className="w-full max-w-md shadow-2xl rounded-2xl px-8 py-8 text-orange-400 bg-white/10 border-2 border-white/60 backdrop-blur-md">
        <h1 className="text-white text-2xl font-bold text-center mb-6 tracking-wide drop-shadow-lg">
          Sahil's <span className="text-orange-400">Password Generator</span>
        </h1>
        <div className="flex shadow-lg rounded-xl overflow-hidden mb-6 bg-gray-900">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 bg-transparent text-orange-300 text-lg font-mono tracking-wider placeholder:text-gray-500 focus:bg-gray-800 transition"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="flex items-center gap-2 outline-none bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-5 py-2 font-semibold rounded-r-xl shadow-md transition-transform duration-150 active:scale-90 focus:ring-2 focus:ring-pink-400"
            onClick={copyPasswordToClipboard}
          >
            <FiCopy className="text-xl" />
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* Password length slider */}
            <label className="text-white font-medium">
              Length: <span className="text-orange-400">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="accent-orange-400 w-2/3"
            />
          </div>
          <div className="flex items-center gap-2">
            {/* Numbers allowed checkbox */}
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              id="numberInput"
              className="accent-orange-400"
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-2">
            {/* Characters allowed checkbox */}
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              id="characterInput"
              className="accent-orange-400"
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;