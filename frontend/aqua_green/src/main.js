import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // Correctly importing vuetify plugin

const app = createApp(App)
app.use(vuetify)

app.mount('#app')
