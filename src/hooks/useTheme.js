import { useCallback, useEffect, useState } from "react";

const root = () => document.documentElement;

function readStored() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

/** Light/dark theme: follows the OS until the visitor picks one, then remembers it. */
export default function useTheme() {
  const [isDark, setIsDark] = useState(() => root().classList.contains("dark"));

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (readStored()) return;
      root().classList.toggle("dark", e.matches);
      setIsDark(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = !root().classList.contains("dark");
    root().classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable — the choice lasts for this visit only */
    }
    setIsDark(next);
  }, []);

  return { isDark, toggle };
}
