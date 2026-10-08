import { Tag } from "@iicemeta/minecraft-react-ui";

import { CodeBlock } from "../components/CodeBlock";
import { exampleCount, groups, libraryName, libraryVersion, propCount } from "../registry";
import { routeHref } from "../lib/useHashRoute";

const installCode = `npm install @iicemeta/minecraft-react-ui`;

const quickStartCode = `import "@iicemeta/minecraft-react-ui/style.css";
import { Button, Tag } from "@iicemeta/minecraft-react-ui";

export default function App() {
  return (
    <div>
      <Button variant="primary">Hello!</Button>
      <Tag>v${libraryVersion}</Tag>
    </div>
  );
}`;

const themingCode = `/* the library publishes its palette as :root custom properties */
:root {
  --background-color: #23232a;
  --primary-color: #3b8526;
  --primary-color-hover: #50ad2e;
  --secondary-color: #d0d1d4;
  --text-color: #fff;
  --text-color-invert: #23232a;
  --foreground-color: #8b8b8b;
  --midground-color: #484848;
}`;

export function GettingStarted() {
  const componentCount = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <article className="page">
      <header className="hero">
        <p className="hero-eyebrow">React 19 · TypeScript · Vite</p>
        <h1>Minecraft React UI</h1>
        <p className="hero-lead">
          The Minecraft UI which Mojang Studios wished to had and haven&apos;t. A
          component library with the blocky bezels, pixel type and rails-style
          controls of the game, rebuilt on React 19.
        </p>
        <div className="hero-meta">
          <Tag>v{libraryVersion}</Tag>
          <Tag>{componentCount} components</Tag>
          <Tag>{exampleCount} live examples</Tag>
          <Tag>{propCount} documented props</Tag>
        </div>
      </header>

      <section className="block">
        <h2>Consuming the published package</h2>
        <p>
          This site imports <code>{libraryName}</code> from npm — not the library&apos;s
          own <code>src/</code> directory. The version badge above is read from the
          installed package manifest at build time, so if the numbers are stale you
          are looking at a stale build.
        </p>
        <CodeBlock code={installCode} />

        <h3>Quick start</h3>
        <p>
          One side-effect import for the styles, then import components by name.
          <code>react</code> and <code>react-dom</code> (<code>^18 || ^19</code>) are
          peer dependencies, so install them in your app.
        </p>
        <CodeBlock code={quickStartCode} />

        <h3>Optional: the pixel font</h3>
        <p>
          The components declare{" "}
          <code>font-family: Minecraft, Minercraftory</code>. That font is not bundled
          with the package, so load it yourself if you want the full pixel look:
        </p>
        <CodeBlock
          code={`<style>
  @import url("https://fonts.cdnfonts.com/css/minercraftory");
</style>`}
        />
      </section>

      <section className="block">
        <h2>Theming</h2>
        <p>
          Every colour is a <code>:root</code> custom property, so the palette is
          overridable without touching the library. This site does exactly that to
          offer its light and dark modes.
        </p>
        <CodeBlock code={themingCode} />
        <p className="note">
          Components also use <code>--bezel-color</code>, <code>--bezel-color-semi</code>{" "}
          and <code>--bezel-color-invert</code> for the extruded edges — override those
          too if you change the base surfaces.
        </p>
      </section>

      <section className="block">
        <h2>Components</h2>
        <p>
          {componentCount} exports, grouped the same way as the library&apos;s own entry
          point. Every one has a live example and a prop table.
        </p>

        <div className="index">
          {groups.map((group) => (
            <div className="index-group" key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((entry) => (
                  <li key={entry.id}>
                    <a href={routeHref(`component/${entry.id}`)}>
                      <span className="index-name">{entry.title}</span>
                      <span className="index-meta">
                        {entry.examples.length} example
                        {entry.examples.length === 1 ? "" : "s"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h2>About this build</h2>
        <p>
          A modernized fork of{" "}
          <a
            href="https://github.com/josempineiro/minecraft-react-ui"
            target="_blank"
            rel="noreferrer"
          >
            josempineiro/minecraft-react-ui
          </a>
          . The runtime dependencies were replaced with maintained equivalents:
        </p>
        <ul className="plain-list">
          <li>
            <code>@floating-ui/react-dom</code> replaces <code>react-popper</code> and{" "}
            <code>@popperjs/core</code> — Dropdown, Tooltip
          </li>
          <li>
            <code>@dnd-kit/*</code> replaces <code>react-beautiful-dnd</code> — List
            drag-and-drop
          </li>
          <li>
            <code>@tanstack/react-virtual</code> replaces <code>react-window</code> — List
            virtualisation
          </li>
          <li>
            <code>clsx</code> replaces <code>classnames</code>, and runtime{" "}
            <code>propTypes</code> were dropped in favour of the TypeScript types
          </li>
        </ul>
        <p className="note">
          Where a prop is declared in the types but not implemented in {libraryVersion},
          the prop table says so instead of hiding it. Those are real gaps, not
          documentation shortcuts.
        </p>
      </section>
    </article>
  );
}
