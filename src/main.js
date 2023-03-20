import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import myUi from "./pages/my-ui";

const app = createApp(App);

app.use(router).use(myUi).mount("#app");
