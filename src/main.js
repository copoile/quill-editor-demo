import Vue from 'vue'
import App from './App'
import router from './router'

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// 表情css
import '@/assets/quill-emoji/quill-emoji.css'

/**
 * mock数据接口，生产环境需要去掉
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false
Vue.use(VueQuillEditor)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
