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

  if (!mounted) {
    return (
      <button aria-label="Toggle theme" disabled className="opacity-0">
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="transition-colors hover:text-blue-700/70" />
      ) : (
        <Moon className="transition-colors hover:text-blue-700/70" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
