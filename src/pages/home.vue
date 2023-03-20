<template>
	<div>
		<MyTable :data="tableDate" @submit="editData"></MyTable>
		<MyTransfer :data="transDate" right-title="已选择"></MyTransfer>
	</div>
</template>

<script setup>
// import { MyTable,MyTransfer } from "./my-ui/index.js";
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

const transDate = reactive([
	{
		title: "华为",
		data: [
			{
				id: 1,
				phone_name: "Mate 40 Pro",
				disabled: false,
			},
			{
				id: 2,
				phone_name: "P40 Pro",
				disabled: true,
			},
			{
				id: 3,
				phone_name: "P50 Pro",
				disabled: false,
			},
			{
				id: 4,
				phone_name: "Mate Xs 2",
				disabled: false,
			},
		],
	},
	{
		title: "苹果",
		data: [
			{
				id: 5,
				phone_name: "iPhone12 Pro",
				disabled: true,
			},
			{
				id: 6,
				phone_name: "iPhone13 Pro",
				disabled: true,
			},
			{
				id: 7,
				phone_name: "iPhone14 Pro Max",
				disabled: false,
			},
			{
				id: 8,
				phone_name: "iPhone11",
				disabled: false,
			},
		],
	},
]);
</script>

<style lang="less" scoped></style>
