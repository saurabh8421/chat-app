import { useState, useEffect } from "react";
import { LuMoonStar } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";


export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-lg text-black text-3xl dark:text-white"
    >
      {theme === "light" ? <LuMoonStar/> : <IoSunnyOutline/>}
    </button>
  );
}