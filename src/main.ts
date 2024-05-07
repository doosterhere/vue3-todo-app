import {createApp} from 'vue';

import App from './App.vue';
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import BaseModal from "@/components/UI/BaseModal.vue";

const app = createApp(App);

app
    .component('BaseButton', BaseButton)
    .component('BaseInput', BaseInput)
    .component('BaseModal', BaseModal);

app.mount('#app');
