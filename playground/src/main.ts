import { removeAppLoading } from 'virtual:app-loading'

import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app element')
}

app.innerHTML = `
  <main class="shell">
    <p class="eyebrow">Playground</p>
    <h1>vite-plugin-app-loading</h1>
    <p class="copy">The app mounted. The injected loading overlay will be removed in one second.</p>
    <button type="button" id="remove-loading">Remove loading again</button>
  </main>
`

window.setTimeout(() => {
  removeAppLoading()
}, 1000)

document.querySelector('#remove-loading')?.addEventListener('click', () => {
  removeAppLoading()
})
