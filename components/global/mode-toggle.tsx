"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //eslint-disable-next-line
    setMounted(true);
  }, []);

  const disabled = !mounted || !resolvedTheme;
  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" disabled={disabled}>
      {isDark ? (
        <Sun className="transition-colors hover:text-blue-700/70" />
      ) : (
        <Moon className="transition-colors hover:text-blue-700/70" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
