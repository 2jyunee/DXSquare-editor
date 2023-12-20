// import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/assets/styles/index.css'
import '@/assets/styles/tailwind.css'

//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/plugins/print.min.js'
//Import third party plugins
import 'froala-editor/js/third_party/embedly.min'
import 'froala-editor/js/third_party/font_awesome.min'
import 'froala-editor/js/third_party/spell_checker.min'
import 'froala-editor/js/third_party/image_tui.min'
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import VueFroala from 'vue-froala-wysiwyg'
import CKEditor from '@ckeditor/ckeditor5-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(VueFroala)
app.use(CKEditor)
// app.use(html2pdf)

app.mount('#app')
