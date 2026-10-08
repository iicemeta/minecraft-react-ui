import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The showcase is a plain static SPA so it can be served directly by
// Cloudflare Pages with no runtime. Routing is hash-based, which means the
// build never needs a server-side rewrite rule to work.
export default defineConfig({
  plugins: [react()],
  // relative asset URLs so the build also works from a subpath
  base: "./",
  server: {
    // the library's own gallery uses 5173; stay out of its way
    port: 5174,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
