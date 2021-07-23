import { createApp } from './main'
import './assets/style.scss'

const { app, router } = createApp({ state: window.__INITIAL_STATE__ })

router.onReady(() => {
  app.$mount('#app')
})
