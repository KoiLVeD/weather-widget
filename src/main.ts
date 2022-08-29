import { defineCustomElement } from "vue";
import App from "./App.vue";
import "@/assets/scss/app.scss";

customElements.define("weather-widget", defineCustomElement(App));
