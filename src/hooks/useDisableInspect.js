import { useEffect } from "react";

export default function useDisableInspect() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Convert key to lowercase to catch all variations safely
      const key = e.key.toLowerCase();

      if (
        key === "f12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.ctrlKey && key === "u")
      ) {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e) => e.preventDefault();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
}