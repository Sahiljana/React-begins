import React, { useCallback, useRef, useState } from "react";
import { FiCopy } from "react-icons/fi"; // npm install react-icons

function App() {
  const [length, setLength] = useState(16);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
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
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [password]);

  // Auto-generate password on mount or when options change (disabled for manual generation)
  /*
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  */

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated dark background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 opacity-90"></div>
      <div className="w-full max-w-2xl shadow-2xl rounded-3xl px-16 py-14 text-orange-400 bg-white/10 border-2 border-white/60 backdrop-blur-md">
        <h1 className="text-white text-4xl font-extrabold text-center mb-10 tracking-wider drop-shadow-lg">
          Your Own <span className="text-orange-400">Password Generator</span>
        </h1>
        <div className="relative flex shadow-lg rounded-2xl overflow-hidden mb-10 bg-gray-900">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-5 px-6 bg-transparent text-orange-300 text-2xl font-mono tracking-widest placeholder:text-gray-500 focus:bg-gray-800 transition"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            aria-label="Generated password"
          />
          <button
            className="flex items-center gap-3 outline-none bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 py-4 text-xl font-bold rounded-r-2xl shadow-lg transition-transform duration-150 active:scale-90 focus:ring-2 focus:ring-pink-400"
            onClick={copyPasswordToClipboard}
            aria-label="Copy password"
          >
            <FiCopy className="text-2xl" />
            Copy
          </button>
          {copied && (
            <span className="absolute right-6 top-3 text-lg text-pink-400 font-bold animate-bounce">
              Copied!
            </span>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            {/* Password length slider */}
            <label className="text-white text-xl font-semibold" htmlFor="lengthSlider">
              Length: <span className="text-orange-400">{length}</span>
            </label>
            <input
              id="lengthSlider"
              type="range"
              min={6}
              max={32}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="accent-orange-400 w-2/3 h-3"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Numbers allowed checkbox */}
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              id="numberInput"
              className="accent-orange-400 w-6 h-6"
            />
            <label htmlFor="numberInput" className="text-white text-lg">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-4">
            {/* Characters allowed checkbox */}
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              id="characterInput"
              className="accent-orange-400 w-6 h-6"
            />
            <label htmlFor="characterInput" className="text-white text-lg">
              Characters
            </label>
          </div>
          {/* Generate Password Button */}
          <button
            className="mt-8 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 py-4 text-xl font-bold rounded-2xl shadow-lg transition-transform duration-150 active:scale-95 focus:ring-2 focus:ring-pink-400"
            onClick={passwordGenerator}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;