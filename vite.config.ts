import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from "@vercel/remix/vite";
import babel from "vite-plugin-babel";
import { installGlobals } from "@remix-run/node";

const ReactCompilerConfig = {
  compilationMode: "annotation",
};

installGlobals({ nativeFetch: true });

export default defineConfig({
  build: {
    minify: "esbuild",
  },
  plugins: [
    remix({
      presets: [vercelPreset()],
      future: {
        unstable_singleFetch: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
});
