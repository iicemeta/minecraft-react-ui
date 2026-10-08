import { useCallback, useEffect, useState } from "react";

import {
  applyTheme,
  readThemePreference,
  resolveTheme,
  storeThemePreference,
  type ThemePreference,
} from "./theme";

export type ThemeController = {
  /** what the user chose: auto | light | dark */
  preference: ThemePreference;
  /** what is actually painted right now */
  resolved: "light" | "dark";
  setPreference: (next: ThemePreference) => void;
};

/**
 * Theme state for the showcase chrome.
 *
 * Defaults to "auto" (follows the OS) with a manual light/dark/auto override,
 * persisted in localStorage. A matching inline script in index.html applies the
 * resolved value before first paint, so there is no flash of the wrong palette.
 */
export function useTheme(): ThemeController {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    readThemePreference()
  );
  const [resolved, setResolved] = useState<"light" | "dark">(() =>
    resolveTheme(readThemePreference())
  );

  useEffect(() => {
    setResolved(applyTheme(preference));
  }, [preference]);

  // while following the OS, react to the OS changing
  useEffect(() => {
    if (preference !== "auto" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(applyTheme("auto"));
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [preference]);

  const setPreference = useCallback((next: ThemePreference) => {
    storeThemePreference(next);
    setPreferenceState(next);
  }, []);

  return { preference, resolved, setPreference };
}
