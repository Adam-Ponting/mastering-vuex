import Vue from 'vue'
import App from './App.vue'
import router from './router' // import the router
import store from './store'
import upperFirst from 'lodash/upperFirst' // to register global icons
import camelCase from 'lodash/camelCase' // to register global icons

const requireComponent = require.context(
  './components', // search in ./components
  false, // dont search subdirectories
  /Base[A-Z]\w+\.(vue|js)$/ // regular expression, search for Basexxx and end in .vue or .js
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName) // loop through each file

  const componentName = upperFirst(
    // convert files to PascalCase
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1')) // removes what's before and after the filename itself
  )

  Vue.component(componentName, componentConfig.default || componentConfig) // register file as global
})

/* // to register global icons, useful if not using many
import BaseIcon from '@/components/BaseIcon.vue' // import as global component
import BaseButton from '@/components/BaseButton.vue' // import as global component
import BaseInput from '@/components/BaseInput.vue' // import as global component

Vue.component('BaseIcon', BaseIcon) // register global component('asName', component) // must be above new.Vue...
Vue.component('BaseButton', BaseButton) // register global component('asName', component) // must be above new.Vue...
Vue.component('BaseInput', BaseInput) // register global component('asName', component) // must be above new.Vue...
 */

Vue.config.productionTip = false

new Vue({
  router, // use the router
  store, // use the store in all components
  render: h => h(App)
}).$mount('#app')
