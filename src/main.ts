import {createApp} from 'vue';

import './assets/global.scss';

import App from './App.vue';
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";

const app = createApp(App);

app
    .component('BaseButton', BaseButton)
    .component('BaseInput', BaseInput);

app.mount('#app');
