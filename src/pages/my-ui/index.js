import MyTable from "./table/MyTable.vue";
import MyTransfer from "./transfer/MyTransfer.vue";

const component = {
	MyTable,
	MyTransfer,
};

export { MyTable, MyTransfer };

export default {
	install(app) {
		for (const c in component) {
			app.component(c, component[c]);
		}
	},
};
