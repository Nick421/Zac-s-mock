// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

Vue.use(Vuetify, {
	theme: {
		primary: colors.indigo.darken3, // #E53935
		secondary: colors.red.lighten1, // #FFCDD2
		accent: colors.pink.accent2, // #3F51B5
	}
})

Vue.use(VueAxios, axios)

Vue.use(VueCookies)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
