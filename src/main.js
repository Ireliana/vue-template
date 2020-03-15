import Vue from "vue";
import Home from "src/pages/index";

Vue.config.productionTip = false;
new Vue({
	el: "#app",
	components: { Home },
	template: "<Home />"
});
