import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

// Library build config
const libConfig: UserConfig = {
  plugins: [
    react(),
    dts({
      include: ["src"],
      rollupTypes: true,
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "minecraft-ui.css": resolve(__dirname, "src/styles/minecraft-ui.css"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MinecraftReactUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@dnd-kit/,
        /^@floating-ui/,
        /^@tanstack/,
        "clsx",
      ],
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
};

// Gallery (demo) dev server config
const galleryConfig: UserConfig = {
  root: resolve(__dirname, "demo"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "minecraft-ui.css": resolve(__dirname, "src/styles/minecraft-ui.css"),
    },
  },
  build: {
    outDir: resolve(__dirname, "demo-dist"),
  },
  server: {
    port: 5173,
    open: false,
  },
};

export default defineConfig(({ command }) => {
  // 'serve' -> gallery dev server; 'build' -> library build
  if (command === "serve") {
    return galleryConfig;
  }
  return libConfig;
});
