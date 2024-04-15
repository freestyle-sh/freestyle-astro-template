import { defineConfig } from "astro/config";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  integrations: [],
  output: "server",
  vite: {
    ssr: {
      external: ["freestyle-sh"],
    },
    esbuild: {
      target: "esnext",
      format: "esm",
      platform: "node",
    },
  },
});
