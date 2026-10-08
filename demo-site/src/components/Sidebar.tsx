import { useMemo, useState } from "react";

import { Input } from "@iicemeta/minecraft-react-ui";

import { entries, groups } from "../registry";
import { routeHref } from "../lib/useHashRoute";

type Props = {
  activeRoute: string;
  /** called after a link is followed, so the mobile drawer can close itself */
  onNavigate?: () => void;
};

export function Sidebar({ activeRoute, onNavigate }: Props) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    if (!needle) return groups;

    return groups
      .map((group) => ({
        name: group.name,
        items: group.items.filter(
          (entry) =>
            entry.title.toLowerCase().includes(needle) ||
            entry.id.includes(needle) ||
            entry.summary.toLowerCase().includes(needle)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [filter]);

  const matched = filtered.reduce((total, group) => total + group.items.length, 0);

  return (
    <nav className="sidebar" aria-label="Components">
      <div className="sidebar-filter">
        <Input
          placeholder={`Filter ${entries.length} components…`}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <ul className="sidebar-list">
        <li>
          <a
            className={`sidebar-link sidebar-link-root${
              activeRoute === "" || activeRoute === "overview" ? " is-active" : ""
            }`}
            href={routeHref("overview")}
            onClick={onNavigate}
          >
            Getting started
          </a>
        </li>
      </ul>

      {filtered.map((group) => (
        <div className="sidebar-group" key={group.name}>
          <span className="sidebar-group-title">{group.name}</span>
          <ul className="sidebar-list">
            {group.items.map((entry) => {
              const route = `component/${entry.id}`;
              return (
                <li key={entry.id}>
                  <a
                    className={`sidebar-link${activeRoute === route ? " is-active" : ""}`}
                    href={routeHref(route)}
                    onClick={onNavigate}
                  >
                    {entry.title}
                    <span className="sidebar-count">{entry.examples.length}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {matched === 0 ? (
        <p className="sidebar-empty">No component matches “{filter}”.</p>
      ) : null}
    </nav>
  );
}
