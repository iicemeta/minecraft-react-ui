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
npm run typecheck  # tsc --noEmit
npm run build      # tsc --noEmit && vite build  ->  dist/
npm run preview    # serve the production build
```

## Deploying to Cloudflare Pages

The build is a plain static SPA, so Cloudflare Pages serves it directly.

### Option A — connect the GitHub repo (recommended)

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
pick `iicemeta/minecraft-react-ui`, then set:

| Setting | Value |
| --- | --- |
| Production branch | `main` (or whichever branch ships the site) |
| **Root directory (advanced)** | `demo-site` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Setting the **root directory** matters: the showcase lives in a subdirectory of
the repository, and without it Pages would install the library's dependencies and
build the library instead of the site.

Add an environment variable if the default Node is too old:

```
NODE_VERSION = 22
```

Every push to the production branch redeploys; other branches get preview URLs.

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
