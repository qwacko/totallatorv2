import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import { preprocessMeltUI } from "@melt-ui/pp";
import sequence from "svelte-sequential-preprocessor";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sequence([
    preprocess({
      postcss: true,
    }),
    preprocessMeltUI(),
  ]),

  kit: {
    alias: {
      $lib: "src/lib",
    },
    adapter: adapter({
      // Prerendering turned off. Turn it on if you know what you're doing.
      prerender: { entries: [] },
      fallback: "index.html", // enable SPA mode
    }),
  },
};

export default config;
