import {createApp} from 'vue'
import App from './App.vue'
import router from './router';

const app = createApp(App)

// config.productionTip = false;
app.use(router);

app.mount('#app');


