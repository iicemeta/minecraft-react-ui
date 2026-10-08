# Parity audit — `upstream-minecraft-react-ui` → `minecraft-react-ui`

Audit date: 2026-10-08
Upstream baseline: `fd29a10` (`josempineiro/minecraft-react-ui`, tag/version 0.7.0)
Fork baseline: `144b95d` (`iicemeta/minecraft-react-ui`, `main`)

Method: mechanical file-set comparison, byte-size comparison, and per-file
`diff -u`. No visual inspection, no assumption.

## 1. Component inventory

| Component family | upstream files | fork files | status |
|---|---|---|---|
| `Tag` | `Tag.tsx` `.css` `index.ts` | same | ported |
| `buttons/Button` | `.tsx` `.css` `.types.ts` `index.ts` (+ `.stories.tsx`) | same minus stories | ported |
| `buttons/ButtonGroup` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `content/DropdownMenu` | `.tsx` `index.ts` (+ stories) | same minus stories | ported |
| `content/List` | `List.tsx` `ListContext.tsx` `ListItem.tsx` `ListOptions.tsx` `types.ts` `index.ts` + 3 css (+ stories) | same minus stories | ported |
| `content/Menu` | `Menu.tsx` `MenuIcon.tsx` `MenuItem.tsx` `index.ts` + 3 css (+ stories) | same minus stories | ported |
| `css/FlexBox` | `.tsx` `.css` `index.ts` | same | ported |
| `inputs/Checkbox` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/CheckboxGroup` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/Input` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/Radio` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/RadioGroup` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/Select` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/Slider` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `inputs/Switch` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `layers/Dropdown` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |
| `layers/Tooltip` | `.tsx` `.css` `index.ts` (+ stories) | same minus stories | ported |

- **16 / 16 component families present. 20 / 20 implementation files present. 0 missing.**
- CSS: `find -name "*.css"` produces an identical 21-entry set in both trees;
  20 of 21 files are byte-identical. Only `content/List/List.css` differs
  (287 B → 521 B) because the fork adds a `.ListScroll` virtual-scroll container.
- The fork's `src/index.ts` exports 19 components + 23 types, versus upstream's
  1 export (`Button`). The fork is a strict superset of the public surface.

## 2. What actually differs

All differences are mechanical modernization, not dropped functionality:

| upstream | fork |
|---|---|
| `propTypes` / `defaultProps` runtime validation | deleted — TS types only (React 19 dropped `defaultProps` on function components anyway) |
| `classnames` | `clsx` via `src/utils/cn.ts` |
| `react-popper` + `@popperjs/core` | `@floating-ui/react-dom` (Dropdown, Tooltip) |
| `react-beautiful-dnd` | `@dnd-kit/core` + `@dnd-kit/sortable` + `@dnd-kit/utilities` (List DnD) |
| `react-window` + `react-virtualized-auto-sizer` | `@tanstack/react-virtual` (List virtualization) |
| `usehooks-ts` (`useEventListener`) | native `useEffect` listeners |
| Rollup + postcss | Vite 6 library mode + `vite-plugin-dts` |
| Storybook 6 + `*.stories.tsx` | Vite gallery at `demo/` |
| inline `["Class_x"]: cond` computed keys | plain object shorthand |

## 3. Gaps found and fixed in this pass

Functional, small — recorded for honesty, not swept under the rug:

1. `Slider` — `SliderProps.variant` union had lost `"tertiary"`
   (upstream: `"primary" | "secondary" | "tertiary"`). Restored to keep the
   published type surface a superset of upstream.
2. `Tooltip` — `TooltipProps` was not exported from the component module nor
   from `src/index.ts`. Now exported.
3. `layers/Dropdown` — `Target` / `TargetFunction` types existed in the module
   but were not re-exported from `src/index.ts`. Now exported.
4. `cn` utility was internal-only. Now exported for consumers who build
   custom Minecraft-styled components.

## 4. Publish-chain gaps filled

Removed by the fork's restructure commit and restored here:

| Item | upstream | fork (before) | fork (after) |
|---|---|---|---|
| `LICENSE` file | absent | absent | added (MIT, dual copyright) |
| `.npmignore` | present | absent | not needed — `files: ["dist", "USAGE.md"]` is authoritative |
| `.npmrc` (token) | present | absent | **deliberately not added** — see note below |
| `.github/workflows/release.yml` | `npm-publish.yml` (node 16, `NPM_TOKEN`, push-to-main) | absent | added — tag-triggered, OIDC trusted publishing, creates the GitHub Release |
| `publishConfig` | `{registry}` | absent | `{access: "public", registry}` |
| `repository` / `homepage` / `bugs` | upstream author | upstream author | repointed to `iicemeta/minecraft-react-ui` |
| package name | `minecraft-react-ui` (taken on npm) | `minecraft-react-ui` | `@iicemeta/minecraft-react-ui` |

### Why no `.npmrc` in the repo

Upstream committed a root `.npmrc` containing
`//registry.npmjs.org/:_authToken=${NPM_TOKEN}`. Copying that pattern into this
repo is actively harmful: a **project** `.npmrc` outranks the **user** `~/.npmrc`,
so when `NPM_TOKEN` is unset the project file injects an *empty* token and
silently shadows whatever `npm login` stored in `~/.npmrc`. Symptom:

```
$ npm login     # succeeds
$ npm whoami
npm error code E401
```

Confirmed with `npm config list`:

```
; //registry.npmjs.org/:_authToken = (protected) ; overridden by project
```

So local publishing relies on `~/.npmrc` (written by `npm login`), and CI relies
on `actions/setup-node` with `registry-url`, which writes its own runner-local
`.npmrc` from the `NODE_AUTH_TOKEN` environment variable. The repo needs neither.
`.npmrc` stays in `.gitignore` so a stray local copy can never be committed.

## 5. Build & install verification (measured)

| Check | Result | Evidence |
|---|---|---|
| `npm run typecheck` | exit 0 | `tsc --noEmit`, no output |
| `npm run build` | exit 0 | 61 modules, 1m1s, ES + CJS + d.ts + CSS emitted |
| Artifact sizes | measured | `index.js` 27.11 kB (gzip 7.12) · `index.cjs` 16.62 kB (gzip 5.76) · `index.d.ts` 10.5 kB · `minecraft-react-ui.css` 21.27 kB (gzip 3.47) |
| `exports["./style.css"]` target exists | yes | `cssFileName: "minecraft-react-ui"` produces `dist/minecraft-react-ui.css` |
| `npm pack` | 10 files | 61.3 kB packed / 257.6 kB unpacked |
| Real consumer install (packed tarball) | 28/28 assertions pass | 20 ESM named exports, 20 CJS exports (same count), `renderToStaticMarkup` → 443 B markup, `style.css` contains `:root` vars with bezel mixin expanded |
| `npm whoami` | `iicemeta` | exit 0 |
| `npm publish --dry-run` | exit 0 | auth accepted → `prepublishOnly` build → tarball → `Publishing to https://registry.npmjs.org/ with tag latest and public access (dry-run)` |

### Release pipeline (`v*` tag)

| Check | Result | Evidence |
|---|---|---|
| `1.0.0` actually live on npm | confirmed | live packument now returns `dist-tags: {latest: "1.0.0"}`, versions `["0.0.0-stage", "1.0.0"]`; downloaded tarball shasum `84c786e0b0455ba4027df6358706a1b1c89c6ca3` is byte-identical to the local reproducible pack |
| `0.0.0-stage` placeholder | explainable artifact | npm staged publishing created it on first publish; the website page lags behind the registry, which is why npmjs.com still rendered "# Temporary Holding Version" while the registry already reported `latest: 1.0.0` |
| version bumped | `1.0.1` | `npm version 1.0.1 --no-git-tag-version` → `package.json`, `package-lock.json` root, and `packages[""]` all `1.0.1` |
| workflow YAML parses | OK | parsed with a strict YAML parser; `on.push.tags=[v*]`, `permissions={id-token: write, contents: write}`, 10 steps |
| action refs exist | verified via GitHub API | `actions/checkout` latest `v7.0.1`, `actions/setup-node` latest `v7.0.0`; `package-manager-cache` input confirmed present in `setup-node@v7/action.yml` |
| tag/version gate | behaves correctly | `v1.0.1` → exit 0; `v1.0.0` → exit 1; `v2.0.0` → exit 1 (executed locally against the real `package.json`) |
| publish-mode switch | behaves correctly | unset → `npm publish`; `stage` → `npm stage publish` |
| no `NODE_AUTH_TOKEN` anywhere | asserted | setting it would inject an empty token into the runner `.npmrc` and shadow OIDC — the exact bug that broke local `npm whoami` |

Not yet performed: pushing the tag (deliberately left to the maintainer).

## 6. Known non-goal

Storybook stories (`*.stories.tsx`, 15 files) and `src/index.stories.mdx` were
intentionally replaced by the `demo/` gallery. They are documentation, not
library components, and are not part of the published artifact.

