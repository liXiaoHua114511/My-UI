<template>
	<div>
		<MyTable :data="tableDate" @submit="editData"></MyTable>
	</div>
</template>

<script setup>
import { MyTable } from "./my-ui/index.js";
import { reactive } from "vue";

const tableDate = reactive({
	tHead: [
		{
			key: "id",
			text: "学号",
			editable: false,
		},
		{
			key: "name",
			text: "姓名",
			editable: false,
		},
		{
			key: "age",
			text: "年龄",
			editable: false,
		},
		{
			key: "chinese",
			text: "语文",
			editable: true,
		},
		{
			key: "math",
			text: "数学",
			editable: true,
		},
		{
			key: "english",
			text: "英语",
			editable: true,
		},
	],
	tBody: [
		{
			id: 1,
			name: "张三",
			age: 16,
			chinese: 121,
			math: 98,
			english: 122,
		},
		{
			id: 2,
			name: "万古",
			age: 17,
			chinese: 21,
			math: 198,
			english: 100,
		},
	],
});

const editData = ({ index, key, value, text }, removeInput) => {
	if (tableDate.tBody[index][key] !== value) {
		const cfm = window.confirm(
			`您确定要将数据下标为${index}项${text}字段的内容修改为${value}吗?`
		);
		if (cfm) {
			tableDate.tBody = tableDate.tBody.map((item, idx) => {
				index === idx && (item[key] = value);
				return item;
			});
		} else {
			removeInput();
		}
	}
};
</script>

<style lang="less" scoped></style>
