import React, { useCallback, useRef, useState } from "react";
import { FiCopy, FiEye, FiEyeOff } from "react-icons/fi";

// Password strength evaluation utility
function getPasswordStrength(password) {
    let score = 0;
    if (!password) return { label: "", color: "", width: "w-0" };
    if (password.length > 7) score++;
    if (password.length > 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
    if (score === 3 || score === 4) return { label: "Medium", color: "bg-yellow-400", width: "w-2/3" };
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
}

function App() {
    const [length, setLength] = useState(16);
    const [numberAllowed, setNumberAllowed] = useState(true);
    const [charAllowed, setCharAllowed] = useState(true);
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);

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

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 999);
        window.navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    }, [password]);

    const strength = getPasswordStrength(password);

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 opacity-90"></div>
            <div className="w-full max-w-2xl shadow-2xl rounded-3xl px-16 py-14 text-orange-400 bg-white/10 border-2 border-white/60 backdrop-blur-md relative">
                <h1 className="text-white text-4xl font-extrabold text-center mb-10 tracking-wider drop-shadow-lg">
                    Your Own <span className="text-orange-400">Password Generator</span>
                </h1>
                <div className="relative flex flex-col shadow-lg rounded-2xl overflow-hidden mb-10 bg-gray-900 px-0 pt-0 pb-4">
                    {/* Eye button: top-left, rounded */}
                    <button
                        type="button"
                        className="absolute left-0 top-0 rounded-tl-2xl bg-gray-900 text-orange-300 hover:text-orange-400 flex items-center justify-center w-12 h-12 z-10 shadow"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={0}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                    </button>

                    {/* Input field with extra left padding for eye button */}
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        className="outline-none w-full py-5 pl-16 pr-6 bg-transparent text-orange-300 text-2xl font-mono tracking-widest placeholder:text-gray-500 focus:bg-gray-800 transition rounded-l-2xl"
                        placeholder="Password"
                        readOnly
                        ref={passwordRef}
                        aria-label="Generated password"
                    />

                    {/* Password Strength Meter */}
                    {password && (
                        <div className="mx-4 mt-2 flex items-center gap-4">
                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-2 transition-all duration-300 ${strength.color} ${strength.width}`}
                                />
                            </div>
                            <span className={`text-sm font-semibold ${strength.color}`}>{strength.label}</span>
                        </div>
                    )}

                    {/* Copy button */}
                    <button
                        className="mt-4 flex items-center gap-3 outline-none bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8 py-4 text-xl font-bold rounded-r-2xl shadow-lg transition-transform duration-150 active:scale-90 focus:ring-2 focus:ring-pink-400"
                        onClick={copyPasswordToClipboard}
                        aria-label="Copy password"
                    >
                        <FiCopy className="text-2xl" />
                        Copy
                    </button>

                    {/* Copied Tooltip */}
                    {copied && (
                        <span className="absolute right-6 top-3 text-lg text-pink-400 font-bold animate-bounce">
                            Copied!
                        </span>
                    )}
                </div>
                {/* Options Panel */}
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
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
                    <button
                        className="mt-8 w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 py-4 text-xl font-bold rounded-2xl shadow-lg transition-transform duration-150 active:scale-95 focus:ring-2 focus:ring-pink-400"
                        onClick={passwordGenerator}
                    >
                        Generate Password
                    </button>
                </div>
                {/* Credit at bottom-right */}
                <span className="absolute bottom-5 right-8 text-base text-pink-300 opacity-80 font-semibold select-none">
                    by Sahil Jana
                </span>
            </div>
        </div>
    );
}

export default App;
