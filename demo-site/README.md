# Minecraft React UI — showcase

The documentation / showcase site for
[`@iicemeta/minecraft-react-ui`](https://www.npmjs.com/package/@iicemeta/minecraft-react-ui).

Important: this package **imports the library from npm**, not from the
repository's `src/` directory. That is deliberate — it means the site doubles as
an integration test for the published artifact. The version badge in the top bar
is read from the installed package manifest at build time.

```
demo-site/
  index.html            theme bootstrap (no flash of the wrong palette)
  vite.config.ts        static SPA, base "./", dev server on 5174
  public/_redirects     SPA fallback for Cloudflare Pages
  public/_headers       security + cache headers for Cloudflare Pages
  src/
    main.tsx            imports "@iicemeta/minecraft-react-ui/style.css"
    App.tsx             top bar, drawer, hash routing
    registry.ts         every component entry, in the library's own order
    demos/              one file per component group
    pages/              GettingStarted, ComponentPage
    components/         Sidebar, ThemeSwitch, Example, CodeBlock, PropsTable
    lib/                theme, hash router, registry types
    styles/site.css     site chrome + light-mode override of the library palette
```

## Local development

```bash
cd demo-site
npm install
npm run dev        # http://localhost:5174
```

The library's own gallery uses port 5173, so this one stays out of its way.

```bash
npm run typecheck        # tsc --noEmit
npm run build            # tsc --noEmit && vite build  ->  dist/
npm run preview          # serve the production build
npm run audit:contrast   # WCAG check of both themes (see below)
```

## Theming and the light-mode adapter

The site offers `auto` / `light` / `dark` and defaults to following the OS. Dark
is the library's palette exactly as shipped; light overrides it in
`src/styles/site.css`.

That override needs a small adapter, because the library has no single "ink that
sits on a given surface" variable. Two of its variables are overloaded:

- `--text-color` is both the page ink **and** the ink drawn on the green
  `--primary-color` surface (primary buttons, the checked checkbox tick, the
  radio dot).
- `--text-color-invert` is both the ink on the light-grey `--secondary-color`
  surface (Tags, secondary buttons) **and** the background of empty controls
  (the empty checkbox/radio box, the switch track).

The shipped dark theme gets away with this because each overloaded pair happens
to want the same value. A light theme cannot — the page ink must be dark while
the empty slots must stay light — so `src/styles/site.css` re-points a handful of
component variables to unpick the couplings. Every override is commented with the
library rule it corrects. **The library itself is not modified.**

Because that adapter depends on the library's internal variables, it is guarded:

```bash
npm run audit:contrast
```

resolves the palette the way the browser would and asserts that every ink/surface
pair the library paints clears its WCAG threshold (4.5:1 for text, 3:1 for
graphics). It currently passes 35/35 across both themes. It is a standalone check
rather than part of `npm run build`, so a library colour change surfaces as a
failed audit instead of a broken deploy.

## Portalled content

`Dropdown` and `Tooltip` render their panel into `document.body` through a React
portal, so the panel is a sibling of `#root` and inherits nothing from the page
around it. Two consequences worth knowing before you style anything that goes in
there:

- **The library's `.Dropdown` wrapper carries no chrome** — no background,
  border, padding or shadow. `.Tooltip` and `.Menu` do bring their own, but
  anything you hand to `Dropdown` as `content` has to supply its own surface, or
  it gets painted transparently over whatever it floats above. `.dropdown-panel`
  in `src/styles/site.css` is where this site does that.
- **The library sets no `z-index` on the panel before 1.0.2**, so an open panel
  loses to the site's own chrome — the sticky topbar (40) and the mobile drawer
  (35), which paint over the panel and take its clicks. 1.0.2 introduced the
  `--floating-z-index` token (default 1000); the site pins its own band by
  setting the token *and* declaring the property, so it behaves the same on both
  versions. `DropdownMenu` and `Select` both build on `Dropdown` and inherit it.

## Deploying to Cloudflare Pages

The build is a plain static SPA, so Cloudflare Pages serves it directly.

### Option A — connect the GitHub repo (recommended)

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
pick `iicemeta/minecraft-react-ui`, then set:

| Setting | Value |
| --- | --- |
| Production branch | **`demo/site`** — see the note below |
| **Root directory (advanced)** | `demo-site` |
| Framework preset | `React (Vite)` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Setting the **root directory** matters: the showcase lives in a subdirectory of
the repository, and without it Pages would install the library's dependencies and
build the library instead of the site.

**The production branch has to be `demo/site`.** `demo-site/` exists on that branch
only, so pointing the project at `main` makes Pages build the library and then fail
with a missing output directory. If this branch is ever merged into `main`, change
the field at the same time.

Two more things the build command gives you for free:

- it runs `tsc --noEmit` before `vite build`, so a type error fails the deployment
  instead of shipping a broken bundle;
- `public/_headers` and `public/_redirects` are Pages-native conventions and Vite
  copies `public/` into `dist/`, so both reach the edge without extra configuration.

### Verifying the deployment

A green build is **not** proof that the site was built. The library's own
`npm run build` also succeeds and also writes to `dist/`, so a project with the
root directory left unset deploys the library bundle and then 404s on every route —
the build log says "success" either way.

Two checks settle it:

```bash
curl -sI https://<project>.pages.dev/index.html -o /dev/null -w '%{http_code}\n'  # 200
curl -sI https://<project>.pages.dev/index.js   -o /dev/null -w '%{http_code}\n'  # 404
```

`index.html` answering 200 is the real pass condition; `index.js` answering 200
means the library was deployed instead of the site. The build log tells you which
one ran before you even open the site:

| what was built | fingerprint in the log |
| --- | --- |
| the site | `dist/index.html`, `dist/assets/index-*.js`, ~63 modules, ~6 s |
| the library | `[vite:dts] Declaration files built`, `dist/index.cjs`, `dist/minecraft-react-ui.css`, ~50 s |

Changing any build setting only affects **new** deployments: after editing the root
directory, redeploy — Deployments → ⋯ → **Retry deployment** re-runs the current
commit against the updated settings, or push any commit.

Node 22 is already the default of Pages' v3 build image (Node 22.16.0, npm 10.9.2)
and `.nvmrc` pins it as well, so **no environment variable is needed**. If a build
ever reports an unexpected Node version, set `NODE_VERSION` under **Settings →
Environment variables** — the v3 image ignores the `engines` field in
`package.json`, so `.nvmrc` or the variable is what counts.

Every push to the production branch redeploys; other branches get preview URLs.

Cloudflare currently steers *new* projects towards Workers with static assets, and
Pages is the older of the two. Pages remains fully supported and is the simpler fit
for a pure static build like this one: the git-connected flow, preview deployments
and the `_headers` / `_redirects` conventions are all built in.

### Option B — deploy from the CLI

```bash
cd demo-site
npm install
npm run build
npx wrangler pages deploy dist --project-name=minecraft-react-ui-showcase
```

### Hash routing

Routing is hash-based (`#/component/button`), so deep links work on any static
host with no rewrite rules. `public/_redirects` still ships an SPA fallback so
the site keeps working if routing is ever switched to history mode.
