import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "sagar-counter",
  },
  external: [
    "react",
    "react-dom",
    "clsx",
    "lucide-react",
    "tailwind-merge",
    "framer-motion",
    "@radix-ui/react-avatar",
    "@radix-ui/react-dialog",
    "@radix-ui/react-slot",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "class-variance-authority",
  ],
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    postcss({
      inject: true,
      minimize: true,
    }),
  ],
});
