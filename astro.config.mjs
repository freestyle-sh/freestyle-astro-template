import { defineConfig } from "astro/config";
import adapter from "@astrojs/node";
import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: adapter({
    mode: "standalone",
  }),
  integrations: [svelte(), react()],
  output: "server",
  vite: {
    esbuild: {
      target: "esnext",
      format: "esm",
      platform: "node",
      keepNames: true,
    },
  },
});
