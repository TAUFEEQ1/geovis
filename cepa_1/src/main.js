import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import './registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.css'

import * as Vue2Leaflet from 'vue2-leaflet'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
// import async from 'async-waterfall'
import VuetifyDaterangePicker from "vuetify-daterange-picker";
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
Vue.use(Vuetify, {
    iconfont: 'fa'
})
Vue.use(VuetifyDaterangePicker);
Vue.config.productionTip = false

Vue.prototype.$axios = axios
    // Vue.prototype.$async = async;
Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-popup', Vue2Leaflet.LPopup)
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons.
import { config } from './config';

Vue.prototype.appConfig = config;

Vue.use(Vuetify, {
    iconfont: 'faSvg',
})
new Vue({
    L,
    render: h => h(App)
}).$mount('#app')