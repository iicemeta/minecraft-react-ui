import { useEffect, useState } from "react";

import { Sidebar } from "./components/Sidebar";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { ComponentPage } from "./pages/ComponentPage";
import { GettingStarted } from "./pages/GettingStarted";
import { libraryVersion } from "./registry";
import { useHashRoute } from "./lib/useHashRoute";
import { useTheme } from "./lib/useTheme";

const COMPONENT_PREFIX = "component/";

export function App() {
  const route = useHashRoute();
  const { preference, resolved, setPreference } = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  // Land at the top of the new page when the route changes, and make sure the
  // mobile drawer is not left hanging open.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setNavOpen(false);
  }, [route]);

  const isComponentRoute = route.startsWith(COMPONENT_PREFIX);

  return (
    <div className="app">
      <header className="topbar">
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-label="Toggle component navigation"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="brand" href="#/overview">
          <span className="brand-block" aria-hidden="true" />
          <span className="brand-name">Minecraft React UI</span>
          <span className="brand-version">v{libraryVersion}</span>
        </a>

        <div className="topbar-right">
          <span className="theme-readout">
            {preference === "auto" ? `auto · ${resolved}` : preference}
          </span>
          <ThemeSwitch preference={preference} onChange={setPreference} />
        </div>
      </header>

      <div className="shell">
        <aside className={`drawer${navOpen ? " is-open" : ""}`}>
          <Sidebar activeRoute={route} onNavigate={() => setNavOpen(false)} />
        </aside>

        <main className="main">
          {isComponentRoute ? (
            <ComponentPage id={route.slice(COMPONENT_PREFIX.length)} />
          ) : (
            <GettingStarted />
          )}

          <footer className="footer">
            <p>
              Built with <code>@iicemeta/minecraft-react-ui@v{libraryVersion}</code> ·
              modernized fork of josempineiro/minecraft-react-ui, MIT licensed.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
