import { defineConfig } from "freestyle-sh";

export default defineConfig({
  dev: {
    command: "npx astro dev",
    proxy: "http://localhost:4321",
  },
});
