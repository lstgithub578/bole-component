import { postcssIsolateStyles } from "vitepress"

export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/, /app\.css/, /app\.scss/], // defaults to /base\.css/
    }),
  ],
}
