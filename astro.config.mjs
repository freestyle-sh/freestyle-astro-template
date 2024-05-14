import { defineConfig } from "astro/config";
import deno from "freestyle-deno-astro-adapter";
import svelte from "@astrojs/svelte";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  integrations: [svelte(), react()],
  output: "server",
  vite: {
    ssr: {
      external: ["freestyle-sh"]
    },
    esbuild: {
      target: "esnext",
      format: "esm",
      platform: "node",
      keepNames: true
    }
  }
});