<template>
	<div>
		<table border="1" class="my-table">
			<thead>
				<tr>
					<th v-for="info of data.tHead" :key="info.key">
						{{ info.text }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) of data.tBody" :key="item.id">
					<td
						v-for="(value, key) in item"
						:key="key"
						@click.stop="showEditInput($event, key, index)"
					>
						{{ value }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import EditInput from "./components/EditInput.vue";
import { defineProps, defineEmits, toRefs, createApp, reactive } from "vue";

//判断input输入框存不存在
let EditInputApp = null;
const state = reactive({
	key: "",
	value: "",
	index: -1,
	text: "",
});
const props = defineProps({
	data: {
		type: Object,
		default: () => ({
			tHead: [],
			tBody: [],
		}),
	},
});
const emit = defineEmits(["submit"]);
const { tHead, tBody } = toRefs(props.data);

const showEditInput = (event, key, index) => {
	console.log(event, key, index);
	//不管有没有input,先删除input,确保只有一个input
	EditInputApp && removeEditInputApp(EditInputApp);
	//如果点击的对象(例如姓名/编号)不可编辑,便终止当前函数
	if (!checkEditAble(key)) return;

	const target = event.target;
	// 文档碎片
	const oFrag = document.createDocumentFragment();

	// 通过 createApp 函数创建一个新的 应用实例(组件)
	EditInputApp = createApp(EditInput, {
		value: target.textContent,
		setValue,
	});
	//如果input组件存在,将input组件挂和插入到点击对象身上
	if (EditInputApp) {
		EditInputApp.mount(oFrag);
		target.appendChild(oFrag);
		target.querySelector(".edit-input").select();
	}

	//保存更改的数据
	setData({ index, key, text: findText(key) });
};

function setData({ index, key, text, value = "" }) {
	state.key = key;
	state.index = index;
	state.value = value;
	state.text = text;
}

function setValue(value) {
	state.value = value;
	emit("submit", { ...state }, removeEditInputApp);
}

//通过key找到当前点击目标的父对象,结构出属性text
function findText(key) {
	const { text } = tHead.value.find((item) => (item.key = key));
	return text;
}

function removeEditInputApp(app) {
	//如果input存在,删除input组件
	EditInputApp && EditInputApp.unmount();
	setData({
		index: -1,
		key: "",
		text: "",
		value: "",
	});
}

//验证点击的dom是否为可编辑dom
function checkEditAble(key) {
	const { editable } = tHead.value.find((item) => item.key == key);
	return editable;
}

//为window绑定点击事件,每次点击就清空input的内容
window.addEventListener("click", EditInputApp, false);
</script>

<style lang="less" scoped>
.my-table {
	width: 100%;
	border-collapse: collasps;
	tr {
		height: 44px;
		td {
			position: relative;
			text-align: center;
			cursor: pointer;
		}
	}
}
</style>
