# @afe1/vite-plugin-app-loading

Inject a startup loading overlay into Vite HTML, then remove it manually when your app is ready.

## Install

```sh
pnpm add -D @afe1/vite-plugin-app-loading
```

## Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { viteInjectAppLoadingPlugin } from '@afe1/vite-plugin-app-loading';

export default defineConfig({
  plugins: [
    viteInjectAppLoadingPlugin()
  ]
});
```

Remove the loading overlay after your framework has mounted:

```ts
// src/main.ts
import { removeAppLoading } from 'virtual:app-loading';

// Mount React, Vue, Svelte, or any other app first.
removeAppLoading();
```

If TypeScript cannot resolve the virtual module, add this once to your Vite env declarations:

```ts
/// <reference types="@afe1/vite-plugin-app-loading" />
```

## Options

```ts
function viteInjectAppLoadingPlugin(): Promise<PluginOption | undefined>;
```

## Release

```sh
pnpm run changeset
```

Commit the generated changeset. After the change lands on `main`, GitHub Actions creates a version PR. Merge that version PR to publish the package to npm.

The release workflow requires an `NPM_TOKEN` secret in the GitHub repository.

## Thanks

Thanks to [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin/tree/7bcb973d6595545e2cef6ad4006d781b3176f67b/internal/vite-config/src/plugins/inject-app-loading) for the inspiration.
