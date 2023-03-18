<template>
	<div>
		<input
			type="text"
			class="edit-input"
			:value="value"
			@input="onInput"
			@blur="onBlur"
			@click="onClick"
		/>
	</div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
	value: {
		type: String,
		default: "",
	},
	//父组件提供一个方法给子组件修改父组件传入的数据
	setValue: {
		type: Function,
		default: () => {},
	},
});

//将传入的值赋值到响应式数据上
const inputValue = ref(props.value);

const onInput = (e) => {
	inputValue.value = e.target.value.trim();
};
const onClick = (e) => {
	e.stopPropagation();
};
const onBlur = () => {
	props.setValue(inputValue.value);
};
</script>

<style lang="less" scoped>
.edit-input {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border: 2px solid yellow;
	text-align: center;
	outline: none;
}
</style>
