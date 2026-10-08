import { useEffect, useState } from "react";

function currentRoute(): string {
  return window.location.hash.replace(/^#\/?/, "");
}

/** Minimal hash router — no dependency, and deep links survive a static host. */
export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(currentRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

export function navigate(route: string): void {
  window.location.hash = `/${route}`;
}

export function routeHref(route: string): string {
  return `#/${route}`;
}
