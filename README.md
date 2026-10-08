# Minecraft React UI

The Minecraft UI which Mojang Studios wished to had and haven't.

A React + TypeScript components library, rebuilt on **React 19**.

> Modernized fork of [josempineiro/minecraft-react-ui](https://github.com/josempineiro/minecraft-react-ui),
> published to npm as **`@iicemeta/minecraft-react-ui`**.

## Installation

```bash
npm install @iicemeta/minecraft-react-ui
```

`react` and `react-dom` (`^18 || ^19`) are peer dependencies — install them in your app.

```tsx
import "@iicemeta/minecraft-react-ui/style.css";
import { Button, Tag } from "@iicemeta/minecraft-react-ui";

export default function App() {
  return (
    <div>
      <Button variant="primary">Hello!</Button>
      <Tag>v1.0</Tag>
    </div>
  );
}
```

See [USAGE.md](./USAGE.md) for a full tutorial with code examples for every component.

## Tech Stack

- **UI:** TypeScript, React 19 and CSS
- **Preview:** lightweight Vite gallery page (`demo/`) — replaces Storybook
- **Build:** Vite (library mode) + postcss (mixins + import)
- **Dependencies (modern replacements):**
  - `@floating-ui/react-dom` → replaces `react-popper` / `@popperjs/core` (Dropdown, Tooltip)
  - `@dnd-kit/*` → replaces `react-beautiful-dnd` (List drag-and-drop)
  - `@tanstack/react-virtual` → replaces `react-window` / `react-virtualized-auto-sizer` (List virtualization)

## Development

```bash
npm install
npm run dev      # gallery on http://localhost:5173
npm run build    # library -> dist/
```

## Components Preview (gallery)

Instead of Storybook, this repo ships a lightweight, interactive gallery page that
shows every component. Run it with:

```bash
npm run dev
```

Then open `http://localhost:5173`. The gallery lives in `demo/` and imports the
real library sources (`src/`), so edits to components hot-reload immediately.

## Build the library

```bash
npm run build
```

Outputs to `dist/`:

- `dist/index.js` — ESM
- `dist/index.cjs` — CommonJS
- `dist/index.d.ts` — TypeScript declarations
- `dist/minecraft-react-ui.css` — bundled, processed styles

Style the minecraft CSS variables (colors, etc.) are available once the styles
are loaded. The CSS build preserves the original `@import "minecraft-ui.css"`
and `@mixin bezel` processing via `postcss.config.cjs` (`postcss-import` +
`postcss-mixins` + `autoprefixer`).

## Components

Buttons · ButtonGroup · Checkbox · CheckboxGroup · Dropdown · DropdownMenu ·
FlexBox · Input · List (virtualized + draggable + search + selection) · Menu ·
MenuIcon · MenuItem · Radio · RadioGroup · Select · Slider · Switch · Tag · Tooltip

## Releasing

Releases are **tag-driven**. Pushing a `v*` tag runs
[`.github/workflows/release.yml`](./.github/workflows/release.yml), which:

1. checks the tag matches `package.json` (hard gate — mismatched tag fails the run)
2. runs `npm ci`, `npm run typecheck` (hard gate), `npm run build`
3. packs the tarball, prints its `sha256` + `dist/` listing to the run summary
4. publishes `@iicemeta/minecraft-react-ui` to npm
5. creates the GitHub Release with generated notes and the tarball attached

```bash
npm version 1.0.1 --no-git-tag-version   # or edit package.json by hand
git add -A && git commit -m "chore: release 1.0.1"
git push origin main
git tag v1.0.1
git push origin v1.0.1                   # <- this triggers the release
```

### Auth: OIDC trusted publishing, no token

The workflow authenticates with **OIDC**; there is no `NPM_TOKEN` secret and no
committed `.npmrc`. Configure it once on npmjs.com:

> Package → **Settings** → **Trusted Publisher** → GitHub Actions
>
> | Field | Value |
> |---|---|
> | Organization or user | `iicemeta` |
> | Repository | `minecraft-react-ui` |
> | Workflow filename | `release.yml` |
> | Environment name | *(leave empty)* |
> | Allowed actions | `npm stage publish` is always on — **also enable `Allow npm publish`** for fully automatic releases |

`Workflow filename` must be the bare filename, and the file must exist at
`.github/workflows/release.yml` on the default branch.

### If you keep the workflow stage-only

If you leave **Allow npm publish** disabled, set the repository variable
`NPM_PUBLISH_MODE=stage` (Settings → Secrets and variables → Actions →
Variables). The workflow then runs `npm stage publish` and a maintainer
approves with 2FA:

```bash
npm stage list
npm stage view <stage-id>
npm stage approve <stage-id>      # prompts for 2FA, then it goes live
```

`npm stage` requires npm ≥ 11.15.0 and Node ≥ 22.14.0, so use the npm from
`C:\Program Files\nodejs` (11.x) rather than an older bundled one.

### Local publish (escape hatch)

```bash
npm login              # stores the credential in ~/.npmrc
npm run build          # prepublishOnly also runs it on `npm publish`
npm pack --dry-run     # inspect tarball contents
npm publish            # publishConfig.access = public
```

> Do **not** commit a root `.npmrc` with `_authToken=${NPM_TOKEN}`. A project
> `.npmrc` outranks `~/.npmrc`, so when the variable is unset it injects an empty
> token and breaks `npm whoami` / `npm publish` locally — the same reason the CI
> workflow deliberately sets no `NODE_AUTH_TOKEN`. See
> [PARITY.md](./PARITY.md#why-no-npmrc-in-the-repo).



## License

MIT — see [LICENSE](./LICENSE). Original work © 2022 José Manuel Piñeiro Garcia.
