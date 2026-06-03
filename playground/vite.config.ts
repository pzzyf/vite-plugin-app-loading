import { defineConfig } from 'vite'
import { viteInjectAppLoadingPlugin } from '@afe1/vite-plugin-app-loading'

export default defineConfig({
  root: 'playground',
  plugins: [viteInjectAppLoadingPlugin()],
})
