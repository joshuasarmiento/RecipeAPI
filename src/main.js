import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

createApp(App)
.use(router)
.use(store)
.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true,
    hideProgressBar: true,
    closeOnClick: true,
    // Discarding prevent Duplicates
    filterBeforeCreate: (toast, toasts) => {
      if (toasts.filter(
        t => t.type === toast.type
      ).length !== 0) {
        // Returning false discards the toast
        return false;
      }
      // You can modify the toast if you want
      return toast;
    }
})
.mount('#app')

