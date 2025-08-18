import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "hls.js": "hls.js/dist/hls.js", // ✅ use non-minified version // Ensure hls.js is resolved correctly
    },
  },
   esbuild: {
    sourcemap: false, // ✅ stop loading broken .map files
  },
}));
