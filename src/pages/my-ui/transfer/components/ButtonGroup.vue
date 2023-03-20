<template>
	<div class="box button-group">
		<button
			:disabled="transferButtonDisabled.right"
			@click="leftButtonClick(checkedData)"
		>
			&lt;
		</button>
		<button
			:disabled="transferButtonDisabled.left"
			@click="rightButtonClick(checkedData)"
		>
			&gt;
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	transferButtonDisabled: {
		type: Array,
		default: () => {},
	},
	checkedData: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits("addRightListData", "removeRightListData");

const leftButtonClick = (checkedData) => {
	emit("removeRightListData", checkedData.right);
};
const rightButtonClick = (checkedData) => {
	emit("addRightListData", checkedData.left);
};
</script>

<style lang="less" scoped>
.button-group {
	// margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;

	button {
		border: none;
		outline: none;
		width: 38px;
		height: 38px;
		background-color: orange;
		border-radius: 5px;
		&:disabled {
			opacity: 0.6;
		}
		&:nth-child(2) {
			margin-left: 10px;
		}
	}
}
</style>
