import MyTable from "./MyTable.vue";
import MyButton from "./MyButton.vue";

const component = {
	MyTable,
	MyButton,
};

export { MyTable, MyButton };

export default {
	install(app) {
		for (const c in component) {
			app.component(c, component[c]);
		}
	},
};
