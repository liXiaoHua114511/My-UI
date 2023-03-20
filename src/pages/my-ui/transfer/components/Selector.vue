<template>
	<div>
		<select name="" id="" @change="selectChange($event.target.value)">
			<option v-for="(title, index) of data" :key="index" :value="index">
				{{ title }}
			</option>
		</select>
	</div>
</template>

<script setup>
const props = defineProps({
	data: {
		type: String,
		default: [],
	},
});

const emit = defineEmits("setTargetIndex");
const selectChange = (value) => {
	emit("setTargetIndex", value);
};
</script>

<style lang="less" scoped></style>
