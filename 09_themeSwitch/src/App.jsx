import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/theme'
import { useEffect } from 'react';
import ThemeBtn from './components/ThemeButton';
import Card from './components/Card';

function App() {
  
  const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  }

  const darkTheme = () => {
    setThemeMode("dark");
  }

  //actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  },[themeMode])

  return (
    // ThemeProvider is used to provide the theme context to the components
    <ThemeProvider value = {{themeMode, lightTheme, darkTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
              {/* Theme Switcher Button */}
              <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
              {/* Main Content or card*/}
              <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
    
  )
}

export default App
