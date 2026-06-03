import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  clean: true,
  copy: {
    from: 'src/default-loading.html',
    to: 'dist',
  },
})
