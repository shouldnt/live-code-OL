import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { transform } from "cjs-es";
import { parse } from "acorn";

const colors = {
  primary: '#43AF3A',
  red: { 0: '#F35060', 2: '#E63547'},
  orange: { 0: '#FFA564' },
  green: { 0: '#05A660', 1: '#06C270', 2: '#39D98A', 3: '#57EBA1', 4: '#E3FFF1', outline: '#06C270' },
  blue: { 0: '#004FC4', 1: '#0063F7', 2: '#5B8DEF', 3: '#9DBFF9', 4: '#E5F0FF', outline: '#0063F7' },
  yellow: { 0: '#E6B800', 1: '#FFCC00', 2: '#FDDD48', 3: '#FDED72', 4: '#FFFEE6', outline: '#FFCC00' },

  dark: { 0: '#1C1C28', 1: '#28293D', 2: '#555770', 3: '#8F90A6', 4: '#C7C9D9', outline: '#8F90A6' },
  light: { 0: '#E4E4EB', 1: '#EBEBF0', 2: '#F2F2F5', 3: '#FAFAFC', 4: '#FFFFFF', outline: '#E4E4EB' },
}

function cjsToEsm() {
  const fileRegex = /ve_constants\/.*\.(js)$/
  const constantIndex = "ve_constants/constants/index.js";
  let config;
  return {
    name: 'transform-internal-submodule',
    apply: 'serve',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    async transform(src, id) {
      if (!config.command === 'serve') return { code: src, id };
      if (id.includes(constantIndex)) {
        return { code: src, id }
      }
      if (fileRegex.test(id) && config.command === 'serve') {
        // https://github.com/eight04/cjs-es
        const result = await transform({
          code: src,
          ast: parse(src, { ecmaVersion: "latest" }),
          sourceMap: true
        })
        return result;
      }
      return { code: src }
    }
  }
}
const resolve = (dir) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [cjsToEsm(), react()],
  server: {
    port: 3001,
  },
  optimizeDeps: {
    esbuildOptions: {
      supported: {
        bigint: true
      }
    }
  },
  build: {
    commonjsOptions: {
      include: [/ve_constants\//, /node_modules/],
    },
    outDir: 'build',
    target: ['esnext']
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      "@components": resolve("./src/components"),
      "@pages": resolve("./src/pages"),
      "@assets": resolve("./src/assets"),
      "@images": resolve("./src/assets/img"),
      "@icons": resolve("./src/assets/icons"),
      "@translations": resolve("./src/lib/translations"),
      "@lib": resolve("./src/lib"),
      "@utilities": resolve("./src/utilities"),
      "@redux": resolve("./src/lib/redux"),
      "@routes": resolve("./src/lib/routes"),
      "@http": resolve("./src/lib/http"),
      "@internal": resolve("./src/internal"),

      "json": resolve("./src/json"),
      "assets": resolve("./src/assets"),
      "atoms": resolve("./src/atoms"),
      "components": resolve("./src/components"),
      "config": resolve("./src/config"),
      "hooks": resolve("./src/hooks"),
      "lib": resolve("./src/lib"),
      "pages": resolve("./src/pages"),
      "queries": resolve("./src/queries"),
      "style": resolve("./src/style"),
      "internal": resolve("./src/internal"),
      "ve_constants": resolve("./internal/ve_constants"),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        modifyVars: {
          "@border-radius-base": "4px",
          "@primary-color": colors.primary,
          "@border-color-base": colors.light[1],

          // input
          "@input-placeholder-color": colors.dark[3],
          "@input-height-base": "40px",

          // button:
          "@btn-default-border": colors.dark[4],
          "@height-sm": '26px',
        },
        javascriptEnabled: true,
      },
    },
  },
})
