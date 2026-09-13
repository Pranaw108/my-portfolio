import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-bg-soft hover:text-ink"
    >
      <Sun
        aria-hidden="true"
        className={`size-[18px] transition-all duration-500 ease-out-expo ${isDark ? "scale-50 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
      />
      <Moon
        aria-hidden="true"
        className={`absolute size-[18px] transition-all duration-500 ease-out-expo ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0"}`}
      />
    </button>
  );
}
