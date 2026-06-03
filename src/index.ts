import type { PluginOption } from 'vite'

import fsp from 'node:fs/promises'

const BODY_RE = /(<body\b[^>]*>)/i
const APP_LOADING_ID = '__app-loading__'
const APP_LOADING_STYLE_SELECTOR = '[data-app-loading="inject-css"]'
const VIRTUAL_MODULE_ID = 'virtual:app-loading'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`

// This module is resolved by the Vite plugin at runtime.
// @ts-ignore TS cannot resolve virtual modules during declaration generation.
declare module 'virtual:app-loading' {
  function removeAppLoading(): void

  export { removeAppLoading }
}

const removeAppLoadingModule = `
const APP_LOADING_ID = ${JSON.stringify(APP_LOADING_ID)}
const APP_LOADING_STYLE_SELECTOR = ${JSON.stringify(APP_LOADING_STYLE_SELECTOR)}

function removeAppLoading() {
  const loading = document.getElementById(APP_LOADING_ID)

  if (!loading || loading.dataset.removing === 'true') {
    return
  }

  loading.dataset.removing = 'true'
  loading.classList.add('hidden')

  let cleaned = false
  const cleanup = () => {
    if (cleaned) {
      return
    }

    cleaned = true
    loading.remove()
    document.querySelector(APP_LOADING_STYLE_SELECTOR)?.remove()
  }

  loading.addEventListener('transitionend', cleanup, { once: true })
  window.setTimeout(cleanup, 1000)
}

export { removeAppLoading }
`

/**
 * 用于获取默认 loading 的 html 模板
 */
async function getDefaultLoadingHtml() {
  return await fsp.readFile(new URL('./default-loading.html', import.meta.url), 'utf8')
}

/**
 * 用于生成将loading样式注入到项目中
 * 为多app提供loading样式，无需在每个 app -> index.html单独引入
 */
async function viteInjectAppLoadingPlugin(): Promise<PluginOption | undefined> {
  const loadingHtml = await getDefaultLoadingHtml()

  if (!loadingHtml) {
    return
  }

  return {
    enforce: 'pre',
    name: 'vite:inject-app-loading',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return removeAppLoadingModule
      }
    },
    transformIndexHtml: {
      handler(html) {
        html = html.replace(BODY_RE, `$1${loadingHtml}`)
        return html
      },
      order: 'pre',
    },
  }
}

export { viteInjectAppLoadingPlugin }
