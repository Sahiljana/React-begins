import { createContext, useContext } from "react";

export const ThemeContext = createContext({
    themeMode: " light", // yahaan default theme set kiya jaa sakta hai
    darkTheme: () => {}, // yahaan dark theme function define kiya jaa sakta hai
    lightTheme: () => {}, // yahaan light theme function define kiya jaa sakta hai
});   // yahaan default value di jaa sakti h


export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {            //useContext(ThemeContext) → Reads the current value of ThemeContext.
    return useContext(ThemeContext);            // yeh ek custom hook humne create kiya
}