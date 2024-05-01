import { defineConfig } from "astro/config";
import deno from "freestyle-deno-astro-adapter";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  integrations: [svelte()],
  output: "server",
  vite: {
    ssr: {
      external: ["freestyle-sh"],
    },
    esbuild: {
      target: "esnext",
      format: "esm",
      platform: "node",
      keepNames: true,
    },
  },
});
